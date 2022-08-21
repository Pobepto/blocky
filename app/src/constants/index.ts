import { BigNumber } from "@ethersproject/bignumber";
import type { AddEthereumChainParameter } from "@web3-react/types";

import { abi as DB_ABI } from "./abi/DB_ABI.json";
import { abi as GAME_ABI } from "./abi/GAME_ABI.json";

export const isDev = true;

export const ACHIEVEMENTS_KEY = "blocky-achievements";

export const CHAIN_PARAMS: AddEthereumChainParameter = isDev
  ? {
      chainId: 80001,
      chainName: "Polygon Mumbai",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    }
  : {
      chainId: 137,
      chainName: "Polygon",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://matic-mainnet.chainstacklabs.com"],
      blockExplorerUrls: ["https://polygonscan.com"],
    };

export const CONTRACTS = {
  GAME: {
    ABI: GAME_ABI,
    ADDRESS: "0x10165d042D061279354fc2f2e0F79DAE2e0D5abF",
  },
  DB: {
    ABI: DB_ABI,
    ADDRESS: "0xA14EB62B38B38d8626Cee16bd1f814536dB996f8",
  },
};

export type DappIds = 0;

export enum DAPP_ID {
  DEX = 0,
  FARM = 1,
  GAMEFI = 2,
  BRIDGE = 3,
  DAO = 4,
}

export interface Node {
  price: BigNumber;
  tps: BigNumber;
}

export interface DApp {
  id: DAPP_ID;
  price: BigNumber;
  tps: BigNumber;
  liquidityPerBlock: BigNumber;
}

export interface IBlockchain {
  id: BigNumber;
  owner: string;
  color: string;
  liquidity: BigNumber;
  liquidityPerBlock: BigNumber;
  startLiquidityEarnAt: BigNumber;
  tps: BigNumber;
  usedTps: BigNumber;
  nodes: BigNumber;
  dappsIds: BigNumber[];
}
