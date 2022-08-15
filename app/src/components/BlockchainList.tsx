import React, { useState } from "react";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { useContracts } from "@src/hooks";
import { useStore } from "@src/store";
import { useAccount } from "@src/utils/metamask";

import { ChainCore, PulsationCircle } from "./Blockchain";

export const BlockchainList: React.FC = () => {
  const { store, write } = useStore();
  const contracts = useContracts();
  const account = useAccount();
  const [isCreating, setCreating] = useState(false);

  const createBlockchain = async () => {
    if (!contracts || isCreating) return;

    setCreating(true);

    try {
      const tx = await contracts.gameContract.createBlockchain();
      await tx.wait();

      const blockchainsIds: BigNumber[] =
        await contracts.gameContract.callStatic.getUserBlockchains(account);

      write(
        "blockchainsIds",
        blockchainsIds.map((id) => id.toNumber())
      );
    } catch (error) {
      setCreating(false);
    } finally {
      setCreating(false);
    }
  };

  const selectBlockchain = (id: number) => {
    write("selectedBlockchainId", id);
  };

  if (store.selectedBlockchainId === undefined) {
    return null;
  }

  return (
    <Root>
      {store.blockchainsIds
        .filter((id) => id !== store.selectedBlockchainId)
        .map((id) => (
          <MiniChainCore key={id} onClick={() => selectBlockchain(id)}>
            <PulsationCircle />
          </MiniChainCore>
        ))}
      <StyledPlusIcon onClick={createBlockchain} />
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

const StyledPlusIcon = styled(PlusIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
