import React, { useEffect } from "react";

import { CHAIN_PARAMS } from "@src/constants";
import { Auth } from "@src/screens/Auth";
import { metaMask, useChainId, useIsActive } from "@src/utils/metamask";

interface Props {
  children: React.ReactNode;
}

export const GuardRoute: React.FC<Props> = ({ children }) => {
  const active = useIsActive();
  const chainId = useChainId();

  const isCorrectChainId = CHAIN_PARAMS.chainId === chainId;

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  if (!active || !isCorrectChainId) {
    return <Auth />;
  }

  return <>{children}</>;
};
