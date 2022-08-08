import { useEffect, useState } from "react";

import { useStore } from "@src/store";

import { useContracts } from "./useContracts";

export const loadData = () => {
  const { dbContract } = useContracts();
  const [isLoading, setLoading] = useState(true);
  const { update } = useStore();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [node, dapps] = await Promise.all([
        dbContract.callStatic.getNode(),
        dbContract.callStatic.getAllDApps(),
      ]);

      update("db", {
        node,
        dapps,
      });
      setLoading(false);
    };

    load();
  }, [dbContract]);

  return isLoading;
};
