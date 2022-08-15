import { BigNumber } from "@ethersproject/bignumber";
import type { AddEthereumChainParameter } from "@web3-react/types";

import { abi as DB_ABI } from "./abi/DB_ABI.json";
import { abi as GAME_ABI } from "./abi/GAME_ABI.json";

export const isDev = true;

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
    ADDRESS: "0x8925bd28a373aDC983ed0Db0101D9AC85D6a54fb",
  },
  DB: {
    ABI: DB_ABI,
    ADDRESS: "0x670f7667D919Cd8baC2217a988Df82Fa865d38BF",
  },
};

export enum DAPP_GROUP {
  DEFI,
  GAMEFI,
}

export enum DAPP_KIND {
  DEFI_DEX,
  DEFI_YIELD_FARMING,
}

export interface Node {
  price: BigNumber;
  tps: BigNumber;
}

export interface DApp {
  group: DAPP_GROUP;
  kind: DAPP_KIND;
  price: BigNumber; // цена покупки
  tps: BigNumber; // количество используемой tps
  liquidityPerBlock: BigNumber; // сколько ликвидности за блок дает
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
