import React from "react";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { useContracts } from "@src/hooks";
import { useStore } from "@src/store";
import { useAccount } from "@src/utils/metamask";

import { ChainCore, PulsationCircle } from "./Blockchain";

export const BlockchainList: React.FC = () => {
  const { store, write } = useStore();
  const contracts = useContracts();
  const account = useAccount();

  const createBlockchain = async () => {
    if (!contracts) return;

    const tx = await contracts.gameContract.createBlockchain();
    await tx.wait();

    const blockchainsIds: BigNumber[] =
      await contracts.gameContract.callStatic.getUserBlockchains(account);

    write(
      "blockchainsIds",
      blockchainsIds.map((id) => id.toNumber())
    );
  };

  const selectBlockchain = (id: number) => {
    write("selectedBlockchainId", id);
  };

  return (
    <Root>
      {store.blockchainsIds
        .filter((id) => id !== store.selectedBlockchainId)
        .map((id) => (
          <MiniChainCore key={id} onClick={() => selectBlockchain(id)}>
            <PulsationCircle />
          </MiniChainCore>
        ))}
      <MiniChainCore onClick={createBlockchain}>+</MiniChainCore>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  height: 100vh;
  display: flex;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50px;
`;

const MiniChainCore = styled(ChainCore)`
  border: 2px solid #fff;
  width: 90px;
  height: 90px;
  margin-bottom: 60px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  ${PulsationCircle} {
    width: 80px;
    height: 80px;
  }
`;
