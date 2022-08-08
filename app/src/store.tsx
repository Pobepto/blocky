import React, { createContext, useContext, useState } from "react";

import { DApp, Node } from "@src/constants";

export interface IStore {
  db: {
    node?: Node;
    dapps?: DApp[];
  };
  blockchainsIds: number[];
}

const initialStore: IStore = {
  db: {},
  blockchainsIds: [],
};

const StoreContext = createContext<{
  store: IStore;
  update: <T extends keyof IStore>(key: T, value: IStore[T]) => void;
}>({
  store: initialStore,
  update: () => null,
});

export const useStore = () => {
  return useContext(StoreContext);
};

export const Store: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, setStore] = useState(initialStore);

  const update = <T extends keyof IStore>(key: T, value: IStore[T]) => {
    setStore({
      ...store,
      [key]: value,
    });
  };

  return (
    <StoreContext.Provider value={{ store, update }}>
      {children}
    </StoreContext.Provider>
  );
};
