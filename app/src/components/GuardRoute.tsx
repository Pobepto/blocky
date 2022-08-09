import React, { useEffect } from "react";

// import { useAccount } from "@src/hooks";
// import { useContracts } from "@src/hooks/useContracts";
// import { useStore } from "@src/store";
import { Auth } from "@src/screens/Auth";
import { metaMask, useIsActive } from "@src/utils/metamask";

interface Props {
  children: React.ReactNode;
}

export const GuardRoute: React.FC<Props> = ({ children }) => {
  const active = useIsActive();
  // const { update } = useStore();
  // const { gameContract, dbContract } = useContracts();
  // const account = useAccount();
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  // useEffect(() => {
  //   if (!active) return;

  //   const load = async () => {
  //     setLoading(true);

  //     const [node, dapps] = await Promise.all([
  //       dbContract.callStatic.getNode(),
  //       dbContract.callStatic.getAllDApps(),
  //     ]);

  //     const blockchainsIds = await gameContract.callStatic.useBlockchains(
  //       account
  //     );

  //     update("db", {
  //       node,
  //       dapps,
  //     });
  //     update("blockchainsIds", blockchainsIds);

  //     setLoading(false);
  //   };

  //   load();
  // }, [active, account]);

  if (!active) {
    return <Auth />;
  }

  // return <>{isLoading ? <h1>Loading</h1> : children}</>;
  return <>{children}</>;
};
