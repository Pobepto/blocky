// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CryptoBoxDB.sol";

contract CryptoBox is Ownable {
  struct Blockchain {
    uint id;
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
  mapping (uint => mapping (uint => uint)) private _blockchainDAppsAmounts; // blockchain_id -> dapp_id -> amount
  Blockchain[] private _blockchains;

  CryptoBoxDB private _db;

  constructor(CryptoBoxDB db) {
    _db = db;
  }

  function createBlockchain() external {
    CryptoBoxDB.NodeData memory NODE_DATA = _db.getNode();

    uint blockchainId = _blockchains.length;

    _blockchains.push(Blockchain({
      id: blockchainId,
      owner: msg.sender,
      liquidity: 1000,
      liquidityPerBlock: 10,
      startLiquidityEarnAt: block.number,
      tps: NODE_DATA.tps,
      usedTps: 0,
      nodes: 1,
      dappsIds: new uint[](0)
    }));

    if (_userBlockchains[msg.sender].length != 0) {
      // TODO: если это уже не первый блокчейн этого пользователя то делать создание платным
    }

    _userBlockchains[msg.sender].push(blockchainId);
  }

  function buy(uint blockchainId, uint nodes, uint[] calldata dapps, uint[] calldata dappsAmounts) external {
    Blockchain storage blockchain = _safeGetBlockchain(blockchainId);

    if (nodes > 0) {
      _buyNodes(blockchain, nodes);
    }

    if (dapps.length > 0) {
      _buyDapps(blockchain, dapps, dappsAmounts);
    }

    blockchain.startLiquidityEarnAt = block.number;
  }

  function _buyNodes(Blockchain storage blockchain, uint amount) internal {
    uint currentNodes = blockchain.nodes;

    // TODO: какой будет лимит на количество нод, можно ли его прокачать?
    // require(currentNodes + amount < 22, "You can't buy more than 22 nodes");

    CryptoBoxDB.NodeData memory NODE_DATA = _db.getNode();

    uint price = cumulativeCost(NODE_DATA.price, currentNodes, currentNodes + amount);

    uint totalLiqudity = blockchain.liquidity + _getBlockchainPendingLiquidity(blockchain);

    require(totalLiqudity >= price, "Not enough liquidity");

    blockchain.liquidity = totalLiqudity - price;
    blockchain.tps += NODE_DATA.tps * amount;
    blockchain.nodes += amount;
  }

  function _buyDapps(Blockchain storage blockchain, uint[] memory dapps, uint[] memory dappsAmounts) internal {
    uint totalLiqudity = blockchain.liquidity + _getBlockchainPendingLiquidity(blockchain);

    uint totalPrice = 0;
    uint totalLiquidityPerBlock = 0;
    uint totalTps = 0;

    for (uint i; i < dapps.length; i++) {
      uint dappId = dapps[i];
      CryptoBoxDB.DAppData memory DAPP_DATA = _db.getDAppById(dappId);
      uint amount = dappsAmounts[i];
      uint currentAmount = _blockchainDAppsAmounts[blockchain.id][dappId];

      totalPrice += cumulativeCost(DAPP_DATA.price, currentAmount, currentAmount + amount);
      totalLiquidityPerBlock += DAPP_DATA.liquidityPerBlock * amount;
      totalTps += DAPP_DATA.tps * amount;
      _blockchainDAppsAmounts[blockchain.id][dappId] += amount;

      // suk govno
      for (uint j; j < amount; j++) {
        blockchain.dappsIds.push(dappId);
      }
    }

    require(totalLiqudity >= totalPrice, "Not enough liquidity");
    require((blockchain.tps - blockchain.usedTps) >= totalTps, "Not enough tps");

    blockchain.liquidity = totalLiqudity - totalPrice;
    blockchain.liquidityPerBlock += totalLiquidityPerBlock;
    blockchain.usedTps += totalTps;
  }

  function cumulativeCost(uint baseCost, uint currentAmount, uint newAmount) internal view returns (uint) {
    uint b = (115**newAmount) / (100**(newAmount - 1));

    if (currentAmount == 0) {
      return (baseCost * (b - 100)) / 15;
    }
    
    if (currentAmount == 1) {
      return (baseCost * (b - 115**currentAmount)) / 15;
    }

    uint a = (115**currentAmount) / (100**(currentAmount - 1));

    return (baseCost * (b - a)) / 15;
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
    return (block.number - blockchain.startLiquidityEarnAt) * blockchain.liquidityPerBlock;
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
