import React, { useEffect, useState } from "react";

import { Blockchain, CreateBlockchain } from "@components/Blockchain";
import { Layout } from "@components/Layout";
import { Spinner } from "@src/components/Spinner";
import { useContracts } from "@src/hooks/useContracts";
import { useStore } from "@src/store";
import { useAccount } from "@src/utils/metamask";

export const Game: React.FC = () => {
  const { write } = useStore();
  const { gameContract, dbContract } = useContracts();
  const account = useAccount();
  const [isLoading, setLoading] = useState(true);
  const [selectedBlockchainId, setSelectedBlockchainId] = useState<number>();

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const [node, dapps] = await Promise.all([
        dbContract.callStatic.getNode(),
        dbContract.callStatic.getAllDApps(),
      ]);

      const blockchainsIds = await gameContract.callStatic.getUserBlockchains(
        account
      );

      if (blockchainsIds.length) {
        setSelectedBlockchainId(blockchainsIds[0].toNumber());
      }

      write("db", {
        node,
        dapps,
      });
      write("blockchainsIds", blockchainsIds);

      setLoading(false);
    };

    load();
  }, [account]);

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (selectedBlockchainId === undefined) {
    return (
      <Layout>
        <CreateBlockchain />
      </Layout>
    );
  }

  return (
    <Layout>
      <Blockchain id={selectedBlockchainId} />
    </Layout>
  );
};
