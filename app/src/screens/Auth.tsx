import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as Metamask } from "@assets/images/metamask.svg";
import { Layout } from "@components/Layout";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "@src/utils/metamask";

export const Auth: React.FC = () => {
  const context = useWeb3React<Web3Provider>()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

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
