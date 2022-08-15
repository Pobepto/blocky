import React, { useEffect, useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";

import { Blockchain, CreateBlockchain } from "@components/Blockchain";
import { Layout } from "@components/Layout";
import { Spinner } from "@src/components/Spinner";
import { useContracts } from "@src/hooks/useContracts";
import { useStore } from "@src/store";
import { getColorFromString } from "@src/utils/getColorFromString";
import { useAccount, useProvider } from "@src/utils/metamask";

export const Game: React.FC = () => {
  const { write, store } = useStore();
  const contracts = useContracts()!;
  const account = useAccount()!;
  const provider = useProvider()!;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const [node, dapps] = await Promise.all([
        contracts.dbContract.callStatic.getNode(),
        contracts.dbContract.callStatic.getAllDApps(),
      ]);

      const blockchainsIds: BigNumber[] =
        await contracts.gameContract.callStatic.getUserBlockchains(account);

      if (blockchainsIds.length) {
        write("selectedBlockchainId", blockchainsIds[0].toNumber());
      }

      write("db", {
        node,
        dapps,
      });
      write(
        "blockchainsIds",
        blockchainsIds.map((id) => id.toNumber())
      );

      setLoading(false);
    };

    load();
  }, [account]);

  useEffect(() => {
    if (store.selectedBlockchainId === undefined) return;

    const loadBlockchain = async () => {
      console.log("load blockchain");
      // TODO: Fix typo in contract
      const { blockchain, pendingLiquiduty } =
        await contracts.gameContract.callStatic.getBlockchain(
          store.selectedBlockchainId
        );

      write("blockchain", {
        ...blockchain,
        liquidity: blockchain.liquidity.add(pendingLiquiduty),
        color: getColorFromString(`${account}-${store.selectedBlockchainId}`),
      });
    };

    const load = async () => {
      setLoading(true);
      await loadBlockchain();
      setLoading(false);
    };

    load();

    setInterval(() => {
      loadBlockchain();
    }, 5_000);

    // provider.on("block", loadBlockchain);

    // return () => {
    //   provider.off("block", loadBlockchain);
    // };
  }, [store.selectedBlockchainId, provider]);

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (store.selectedBlockchainId === undefined || !store.blockchain) {
    return (
      <Layout>
        <CreateBlockchain />
      </Layout>
    );
  }

  return (
    <Layout>
      <Blockchain blockchain={store.blockchain} />
    </Layout>
  );
};
