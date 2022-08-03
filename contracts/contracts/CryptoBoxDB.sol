// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoBoxDB {
  struct NodeData {
    uint basePrice;
    uint tpsIncrement;
  }

  NodeData[3] private _nodes;

  constructor() {
    // Level 1 node
    _nodes[0] = NodeData({
      basePrice: 100, // buy price
      tpsIncrement: 1
    });

    // Level 2 node
    _nodes[1] = NodeData({
      basePrice: 1000, // upgrade price
      tpsIncrement: 10
    });

    // Level 3 node
    _nodes[2] = NodeData({
      basePrice: 10000, // upgrade price
      tpsIncrement: 100
    });
  }

  function getNodeByLevel(uint level) public view returns (NodeData memory) {
    return _nodes[level - 1];
  }
}