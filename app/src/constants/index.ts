import { BigNumber } from "@ethersproject/bignumber";
import type { AddEthereumChainParameter } from "@web3-react/types";

import { abi as DB_ABI } from "./abi/DB_ABI.json";
import { abi as GAME_ABI } from "./abi/GAME_ABI.json";

export const isDev = true;

export const CHAIN_PARAMS: AddEthereumChainParameter = isDev
  ? {
      chainId: 80001,
    }
  : {
      chainId: 80001,
    };

export const CONTRACTS = {
  GAME: {
    ABI: GAME_ABI,
    ADDRESS: "",
  },
  DB: {
    ABI: DB_ABI,
    ADDRESS: "",
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
