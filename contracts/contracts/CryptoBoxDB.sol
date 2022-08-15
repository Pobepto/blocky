// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoBoxDB {
  enum DAPP_GROUP {
    DEFI,
    GAMEFI
  }

  enum DAPP_KIND {
    DEFI_DEX,
    DEFI_YIELD_FARMING
  }

  struct NodeData {
    uint price;
    uint tps;
  }

  struct DAppData {
    DAPP_GROUP group;
    DAPP_KIND kind;
    uint price; // цена покупки
    uint tps; // количество используемой tps
    uint liquidityPerBlock; // сколько ликвидности за блок дает
  }

  NodeData private _node;
  DAppData[] private _dapps;

  constructor() {
    initNode();
    initDApps();
  }

  function initNode() internal {
    _node = NodeData({
      price: 100,
      tps: 1
    });
  }

  function initDApps() internal {
    _dapps.push(DAppData({
      group: DAPP_GROUP.DEFI,
      kind: DAPP_KIND.DEFI_DEX,
      price: 100,
      tps: 1,
      liquidityPerBlock: 100
    }));
  }

  function getNode() public view returns (NodeData memory) {
    return _node;
  }

  function getDAppById(uint id) public view returns (DAppData memory) {
    return _dapps[id];
  }

  function getAllDApps() external view returns (DAppData[] memory dapps) {
    return _dapps;
  }
}