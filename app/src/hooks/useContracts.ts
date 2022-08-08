import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";

import { CONTRACTS } from "@src/constants";
import { useProvider } from "@src/utils/metamask";

import { useAccount } from "./useAccount";

export const useContracts = () => {
  const account = useAccount();
  const provider = useProvider();

  return useMemo(() => {
    const gameContract = new Contract(
      CONTRACTS.GAME.ADDRESS,
      CONTRACTS.GAME.ABI,
      provider
    );
    const dbContract = new Contract(
      CONTRACTS.DB.ADDRESS,
      CONTRACTS.DB.ABI,
      provider
    );

    return {
      gameContract,
      dbContract,
    };
  }, [account]);
};
