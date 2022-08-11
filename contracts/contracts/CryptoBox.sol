// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CryptoBoxDB.sol";

contract CryptoBox is Ownable {
  struct Blockchain {
    address owner;
    uint liquidity; // total liquidity of the blockchain
    uint liquidityPerBlock; // liquidity per block
    uint startLiquidityEarnAt;
    uint tps; // total tps of the blockchain
    uint usedTps; // tps uses by the dapps
    uint nodes;
    uint[] dappsIds;
  }

  mapping (address => uint[]) private _userBlockchains; // user_address -> blockchain_id[]
  Blockchain[] private _blockchains;

  CryptoBoxDB private _db;

  constructor(CryptoBoxDB db) {
    _db = db;
  }

  function createBlockchain() external {
    CryptoBoxDB.NodeData memory NODE_DATA = _db.getNode();

    _blockchains.push(Blockchain({
      owner: msg.sender,
      liquidity: 10,
      liquidityPerBlock: 0,
      startLiquidityEarnAt: block.number,
      tps: NODE_DATA.tps,
      usedTps: 0,
      nodes: 1,
      dappsIds: new uint[](0)
    }));
    
    uint blockchainId = _blockchains.length - 1;

    if (_userBlockchains[msg.sender].length != 0) {
      // TODO: если это уже не первый блокчейн этого пользователя то делать создание платным
    }

    _userBlockchains[msg.sender].push(blockchainId);
  }

  function buyNode(uint blockchainId) external {
    Blockchain storage blockchain = _safeGetBlockchain(blockchainId);

    uint nodes = blockchain.nodes;

    // TODO: какой будет лимит на количество нод, можно ли его прокачать?
    require(nodes < 22, "You can't buy more than 22 nodes");

    CryptoBoxDB.NodeData memory NODE_DATA = _db.getNode();

    // TODO: супер тупая формула, но в будущем нужно будет сделать так, чтобы покупка следующей ноды была дороже предыдущей
    uint price = NODE_DATA.price * nodes;

    uint totalLiqudity = blockchain.liquidity + _getBlockchainPendingLiquidity(blockchain);

    require(totalLiqudity >= price, "Not enough liquidity");

    blockchain.liquidity = totalLiqudity - price;
    blockchain.startLiquidityEarnAt = block.number;
    blockchain.tps += NODE_DATA.tps;
    blockchain.nodes += 1;
  }

  function buyDApp(uint blockchainId, uint dappId) external {
    Blockchain storage blockchain = _safeGetBlockchain(blockchainId);
    CryptoBoxDB.DAppData memory DAPP_DATA = _db.getDAppById(dappId);

    uint totalLiqudity = blockchain.liquidity + _getBlockchainPendingLiquidity(blockchain);

    require(totalLiqudity >= DAPP_DATA.price, "Not enough liquidity");
    require((blockchain.tps - blockchain.usedTps) >= DAPP_DATA.tps, "Not enough tps");

    blockchain.liquidity = totalLiqudity - DAPP_DATA.price;
    blockchain.liquidityPerBlock += DAPP_DATA.liquidityPerBlock;
    blockchain.startLiquidityEarnAt = block.number;
    blockchain.usedTps += DAPP_DATA.tps;
    blockchain.dappsIds.push(dappId);
  }

  // onlyOwner methods
  function setDB(CryptoBoxDB db) external onlyOwner {
    _db = db;
  }

  // private view methods
  function _safeGetBlockchain(uint blockchainId) private view returns (Blockchain storage) {
    Blockchain storage blockchain = _blockchains[blockchainId];

    require(blockchain.owner != address(0), "Blockchain not found");
    require(blockchain.owner == msg.sender, "You are not the owner of this blockchain");

    return blockchain;
  }

  function _getBlockchainPendingLiquidity(Blockchain memory blockchain) private view returns (uint) {
    uint earnedLiqudiity = (block.number - blockchain.startLiquidityEarnAt) * blockchain.liquidityPerBlock;

    return blockchain.liquidity + earnedLiqudiity;
  }

  // public view methods
  function getBlockchain(uint blockchainId) external view returns (Blockchain memory blockchain, uint pendingLiquiduty) {
    blockchain = _blockchains[blockchainId];
    pendingLiquiduty = _getBlockchainPendingLiquidity(blockchain);
  }

  function getUserBlockchains(address user) external view returns (uint[] memory) {
    return _userBlockchains[user];
  }
}
