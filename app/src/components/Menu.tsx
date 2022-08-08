import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as NodeSVG } from "@assets/game2/Node.svg";

const Item: React.FC = () => {
  return (
    <ItemRoot>
      <NodeSVG />
      <span style={{ fontSize: "10px" }}>ksldkaldkal;dka</span>
    </ItemRoot>
  );
};

const ItemRoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Menu: React.FC = () => {
  return (
    <Root>
      <Title>SHOP</Title>
      <Content>
        <Item />
        <Item />
        <Item />
        <Item />
      </Content>
      <Footer>
        <span>CANCEL</span>
        <span>BUY</span>
      </Footer>
    </Root>
  );
};

export const Root = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 100vh;
  border-left: 2px solid ${({ theme }) => theme.colors.yellow};
  background: #00000090;
  top: 0;
  right: 0;
  z-index: 1;
`;

export const Content = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  flex-grow: 1;
`;

export const Footer = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
  margin-bottom: 20px;

  > span:nth-of-type(1) {
    font-size: 12px;
  }

  > span {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;

export const Title = styled.span`
  font-size: 20px;
  padding-top: 50px;
  margin-bottom: 20px;
`;
