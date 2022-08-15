import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { ReactComponent as ImportantIcon } from "@assets/images/important.svg";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as QuestionIcon } from "@assets/images/question.svg";
import { Blockchain, CreateBlockchain } from "@components/Blockchain";
import { Layout } from "@components/Layout";
import { BlockchainList } from "@src/components/BlockchainList";
import { Menu } from "@src/components/Menu";
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
  const [isMenuVisible, setMenuVisible] = useState(false);

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

    const interval = setInterval(() => {
      loadBlockchain();
    }, 5_000);

    return () => {
      clearInterval(interval);
    };
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

  const { liquidity, liquidityPerBlock, usedTps, tps } = store.blockchain;

  return (
    <Layout>
      <BlockchainList />
      <Blockchain blockchain={store.blockchain} />
      <Footer>
        <TVLBlock>
          <span>
            {liquidity?.div(100).toString() ?? "0"} (+
            {liquidityPerBlock?.div(100).toString() ?? "0"}) Liqudity
          </span>
          <span>
            {usedTps?.toString() ?? "0"}/{tps?.toString() ?? "0"} TPS
          </span>
        </TVLBlock>

        <ButtonsBlock>
          <StyledQuestionIcon />
          <StyledImportantIcon />
          <StyledPlusIcon onClick={() => setMenuVisible(true)} />
        </ButtonsBlock>
      </Footer>
      <Menu close={() => setMenuVisible(false)} isOpen={isMenuVisible} />
    </Layout>
  );
};

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 15px 50px;
`;

const TVLBlock = styled.div`
  display: flex;
  align-items: flex-start;
  user-select: none;
  flex-direction: column;

  span {
    margin: 3px 0;
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledPlusIcon = styled(PlusIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
const StyledQuestionIcon = styled(QuestionIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
const StyledImportantIcon = styled(ImportantIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
