import React, { createContext, useContext, useState } from "react";

import { DApp, IBlockchain, Node } from "@src/constants";

export interface IStore {
  db: {
    node?: Node;
    dapps?: DApp[];
  };
  blockchainsIds: number[];
  blockchain?: IBlockchain;
  selectedBlockchainId?: number;
}

const initialStore: IStore = {
  db: {},
  blockchainsIds: [],
};

const StoreContext = createContext<{
  store: IStore;
  write: <T extends keyof IStore>(key: T, value: IStore[T]) => void;
}>({
  store: initialStore,
  write: () => null,
});

export const useStore = () => {
  return useContext(StoreContext);
};

export const Store: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, setStore] = useState(initialStore);

  const write = <T extends keyof IStore>(key: T, value: IStore[T]) => {
    setStore((store) => ({
      ...store,
      [key]: value,
    }));
  };

  return (
    <StoreContext.Provider value={{ store, write }}>
      {children}
    </StoreContext.Provider>
  );
};
