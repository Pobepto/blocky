import { useEffect, useState } from "react";

import { useContracts } from "./useContracts";

export const useBlockchain = (id: number) => {
  const { gameContract } = useContracts();
  const [isLoading, setLoading] = useState(true);
  const [blockchain, setBlockchain] = useState();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const blockchain = await gameContract.callStatic.getBlockchain(id);

      setBlockchain(blockchain);
      setLoading(false);
    };

    load();
  }, [gameContract]);

  return {
    isLoading,
    blockchain,
  };
};
