import React, { useEffect } from "react";

import { Auth } from "@src/screens/Auth";
import { metaMask, useIsActive } from "@src/utils/metamask";

interface Props {
  children: React.ReactNode;
}

export const GuardRoute: React.FC<Props> = ({ children }) => {
  const active = useIsActive();

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  if (!active) {
    return <Auth />;
  }

  return <>{children}</>;
};
