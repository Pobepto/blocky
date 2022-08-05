import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as Metamask } from "@assets/images/metamask.svg";
import { Layout } from "@components/Layout";
import { useWeb3React } from "@web3-react/core";

export const Auth: React.FC = () => {
  const { connector } = useWeb3React()
  console.log(`Priority Connector is: ${connector}`)

  connector.activate(1);

  return (
    <Layout>
      <Root>
        <ChainCore>
          <Metamask />
        </ChainCore>
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
