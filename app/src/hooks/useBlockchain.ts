import { useEffect, useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";

import { useContracts } from "./useContracts";

export interface IBlockchain {
  owner: string;
  liquidity: BigNumber;
  pendingLiquidity: BigNumber;
  liquidityPerBlock: BigNumber;
  startLiquidityEarnAt: BigNumber;
  tps: BigNumber;
  usedTps: BigNumber;
  nodes: BigNumber;
  dappsIds: BigNumber[];
}

export const useBlockchain = (id: number) => {
  const { gameContract } = useContracts();
  const [isLoading, setLoading] = useState(true);
  const [blockchain, setBlockchain] = useState<IBlockchain>();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { blockchain, pendingLiquiduty } =
        await gameContract.callStatic.getBlockchain(id);

      setBlockchain({
        ...blockchain,
        pendingLiquidity: pendingLiquiduty,
      });
      setLoading(false);
    };

    load();
  }, [gameContract]);

  return {
    isLoading,
    blockchain,
  };
};
