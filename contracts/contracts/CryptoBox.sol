// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CryptoBoxDB.sol";

contract CryptoBox is Ownable {
  enum DAPP_CATEGORY {
    DEFI,
    GAMEFI
  }

  enum DAPP_TYPE {
    DEFI_DEX,
    DEFI_YIELD_FARMING
  }

  struct DApp {
    uint blockchainId; // reference to the blockchain
    uint level;
    DAPP_CATEGORY category;
    DAPP_TYPE dappType; // `type` is a reserved keyword in Solidity, so we use `dappType` instead
  }

  struct Blockchain {
    address owner;
    uint liquidity;
    uint tps; // total tps of the blockchain
    uint usedTps; // tps uses by the blockchain dapps
    uint nodes1Amount; // level 1 nodes amount
    uint nodes2Amount; // level 2 nodes amount
    uint nodes3Amount; // level 3 nodes amount
    uint[] dappsIds;
  }

  mapping (address => uint[]) private _userBlockchains; // user_address -> blockchain_id[]
  Blockchain[] private _blockchains;
  DApp[] private _dapps;

  CryptoBoxDB private _db;

  constructor(CryptoBoxDB db) {
    _db = db;
  }

  function createBlockchain() external {
    _blockchains.push(Blockchain({
      owner: msg.sender,
      liquidity: 0,
      tps: 1, // TODO: tps of the first 1 level node
      usedTps: 0, // TODO: first dapp will use this
      nodes1Amount: 1,
      nodes2Amount: 0,
      nodes3Amount: 0,
      dappsIds: new uint[](0) // TODO: initialize with the first dapp
    }));
    
    uint blockchainId = _blockchains.length - 1;

    if (_userBlockchains[msg.sender].length != 0) {
      // TODO: если это уже не первый блокчейн этого пользователя то делать создание платным
    }

    _userBlockchains[msg.sender].push(blockchainId);
  }

  function buyNode(uint blockchainId) external {
    Blockchain storage blockchain = getBlockchain(blockchainId);

    uint totalNodes = blockchain.nodes1Amount + blockchain.nodes2Amount + blockchain.nodes3Amount;

    // TODO: какой будет лимит на количество нод, можно ли его увеличить?
    require(totalNodes < 22, "You can't buy more than 22 nodes");

    CryptoBoxDB.NodeData memory NODE1_DATA = _db.getNodeByLevel(1);

    // TODO: супер тупая формула, но в будущем нужно будет сделать так, чтобы покупка следующей ноды была дороже предыдущей
    uint nodePrice = NODE1_DATA.basePrice * totalNodes;
    require(blockchain.liquidity >= nodePrice, "Not enough liquidity");

    blockchain.liquidity -= nodePrice;
    blockchain.tps += NODE1_DATA.tpsIncrement;
    blockchain.nodes1Amount += 1;
  }

  function upgradeNode1(uint blockchainId) external {
    Blockchain storage blockchain = getBlockchain(blockchainId);

    require(blockchain.nodes1Amount > 0, "You can't upgrade a node if there is no node");

    CryptoBoxDB.NodeData memory NODE2_DATA = _db.getNodeByLevel(2);
    require(blockchain.liquidity >= NODE2_DATA.basePrice, "Not enough liquidity");

    blockchain.nodes1Amount -= 1;
    blockchain.nodes2Amount += 1;
    blockchain.liquidity -= NODE2_DATA.basePrice;
    blockchain.tps += NODE2_DATA.tpsIncrement;
  }

  function upgradeNode2(uint blockchainId) external {
    Blockchain storage blockchain = getBlockchain(blockchainId);

    require(blockchain.nodes2Amount > 0, "You can't upgrade a node if there is no node");

    CryptoBoxDB.NodeData memory NODE3_DATA = _db.getNodeByLevel(3);
    require(blockchain.liquidity >= NODE3_DATA.basePrice, "Not enough liquidity");

    blockchain.nodes1Amount -= 1;
    blockchain.nodes2Amount += 1;
    blockchain.liquidity -= NODE3_DATA.basePrice;
    blockchain.tps += NODE3_DATA.tpsIncrement;
  }

  function createDApp(uint blockchainId, DAPP_CATEGORY category, DAPP_TYPE dappType) external {
    Blockchain storage blockchain = getBlockchain(blockchainId);

    // TODO: проверить, что у блокчейна хватает tps чтобы запустить на нём этот dapp

    _dapps.push(DApp({
      blockchainId: blockchainId,
      level: 1,
      category: category,
      dappType: dappType
    }));

    blockchain.usedTps += 1; // TODO: используемое кол-во tps в зависимости от dapp
    blockchain.dappsIds.push(_dapps.length - 1);
  }

  // onlyOwner methods
  function setDB(CryptoBoxDB db) external onlyOwner {
    _db = db;
  }

  //view methods
  function getBlockchain(uint blockchainId) private view returns (Blockchain storage) {
    Blockchain storage blockchain = _blockchains[blockchainId];

    require(blockchain.owner != address(0), "Blockchain not found");
    require(blockchain.owner == msg.sender, "Only blockchain owner can create dapp");

    return blockchain;
  }

  function getBlockchainInfo(uint blockchainId) external view returns (Blockchain memory) {
    return _blockchains[blockchainId];
  }

  function getDappsInfo(uint[] calldata dappsIds) external view returns (DApp[] memory dapps) {
    uint amount = dappsIds.length;
    dapps = new DApp[](amount);

    for (uint i = 0; i < amount; i++) {
      dapps[i] = _dapps[dappsIds[i]];
    }
  }
}
