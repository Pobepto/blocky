import { useEffect, useState } from "react";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

import { useProvider } from "@src/utils/metamask";

import { useBlockchain } from "./useBlockchain";

export const useTVL = () => {
  const provider = useProvider();
  const { blockchain } = useBlockchain(1);
  const [TVL, setTVL] = useState<BigNumberish>(BigNumber.from(0));

  useEffect(() => {
    if (!provider || !blockchain) return;

    console.log(provider);

    const interval = setInterval(async () => {
      const blockNumber = await provider?.getBlockNumber();

      if (!blockNumber) {
        setTVL(-1);
        return;
      }

      console.log(blockchain);

      const TVL = BigNumber.from(blockNumber)
        .sub(blockchain.startLiquidityEarnAt)
        .mul(1);
      // .mul(blockchain.liquidityPerBlock);
      setTVL(TVL);
    }, 5_000);

    return () => {
      clearInterval(interval);
    };
  }, [blockchain, provider]);

  return TVL;
};
