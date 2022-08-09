import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as Metamask } from "@assets/images/metamask.svg";
import { Layout } from "@components/Layout";
import { BlockRain } from "@src/components/BlockRain";
import { OffsetBlock } from "@src/components/OffsetBlock";
import { CHAIN_PARAMS } from "@src/constants";
import { metaMask } from "@src/utils/metamask";

export const Auth: React.FC = () => {
  const onConnect = async () => {
    await metaMask.activate(CHAIN_PARAMS);
  };

  return (
    <Layout>
      <OffsetBlock left={0} top={-200}>
        <BlockRain />
      </OffsetBlock>
      <Root>
        {/* TODO: Add correct chain information, switch chain on connect */}
        <ChainCore onClick={onConnect}>
          <Metamask />
        </ChainCore>
        <OffsetBlock left={0} top={250}>
          <BlockRain reverse />
        </OffsetBlock>
        <Message>Press Metamask to continue...</Message>
      </Root>
    </Layout>
  );
};

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow-y: hidden;
`;

const Message = styled.span`
  font-size: 14px;
`;

const ChainCore = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #fff;
  color: ${({ theme }) => theme.colors.red};
  background-color: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 30px;
`;
