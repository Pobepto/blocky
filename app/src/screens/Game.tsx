import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as QuestionIcon } from "@assets/images/question.svg";
import { Blockchain, CreateBlockchain } from "@components/Blockchain";
import { Layout } from "@components/Layout";
import { Achievement } from "@src/components/Achievement";
import { BlockchainList } from "@src/components/BlockchainList";
import { Menu } from "@src/components/Menu";
import { Spinner } from "@src/components/Spinner";
import { useContracts } from "@src/hooks/useContracts";
import { useStore } from "@src/store";
import { BN } from "@src/utils/BN";
import { getColorFromIndex } from "@src/utils/getColorFromIndex";
import { useAccount, useProvider } from "@src/utils/metamask";

export const Game: React.FC = () => {
  const { write, store } = useStore();
  const contracts = useContracts()!;
  const account = useAccount()!;
  const provider = useProvider()!;
  const [isLoading, setLoading] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isAchievementVisible, setAchievementVisible] = useState(false);

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
        dapps: dapps.map((dapp: any) => ({
          ...dapp,
          id: dapp.id.toNumber(),
        })),
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
      const { blockchain, pendingLiquidity } =
        await contracts.gameContract.callStatic.getBlockchain(
          store.selectedBlockchainId
        );

      const localBlockchainIndex = store.blockchainsIds.findIndex(
        (id) => id === blockchain.id.toNumber()
      );

      write("blockchain", {
        ...blockchain,
        liquidity: blockchain.liquidity.add(pendingLiquidity),
        color: getColorFromIndex(localBlockchainIndex),
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
            {BN.formatUnits(liquidity, 2).toString() ?? "0"} (+
            {BN.formatUnits(liquidityPerBlock, 2).toString() ?? "0"}) Liquidity
          </span>
          <span>
            {usedTps?.toString() ?? "0"}/{tps?.toString() ?? "0"} TPS
          </span>
        </TVLBlock>

        <ButtonsBlock>
          <StyledQuestionIcon onClick={() => setAchievementVisible(true)} />
          <StyledPlusIcon onClick={() => setMenuVisible(true)} />
        </ButtonsBlock>
      </Footer>
      <Menu close={() => setMenuVisible(false)} isOpen={isMenuVisible} />
      <Achievement
        close={() => setAchievementVisible(false)}
        isOpen={isAchievementVisible}
      />
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
