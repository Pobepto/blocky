import React, { useState } from "react";
import styled from "@emotion/styled";

import { ReactComponent as BridgeSVG } from "@assets/game/Bridge.svg";
import { ReactComponent as DaoSVG } from "@assets/game/Dao.svg";
import { ReactComponent as DexSVG } from "@assets/game/Dex.svg";
import { ReactComponent as FarmingSVG } from "@assets/game/Farming.svg";
import { ReactComponent as NodeSVG } from "@assets/game/Node.svg";

interface ItemProps {
  icon: React.FC;
}

const Item: React.FC<ItemProps> = ({ icon: Icon }) => {
  const [count, setCount] = useState(0);

  const onDecrease = () => {
    if (count - 1 < 0) {
      setCount(0);
      return;
    }
    setCount(count - 1);
  };

  return (
    <ItemRoot>
      <Icon />
      <span style={{ fontSize: "10px" }}>ksldkaldkal;dka</span>
      <CounterBlock>
        <span onClick={onDecrease}>-</span>
        <span>{count}</span>
        <span onClick={() => setCount((v) => v + 1)}>+</span>
      </CounterBlock>
    </ItemRoot>
  );
};

const ItemRoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

const CounterBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  > span {
    user-select: none;
  }

  > span:nth-of-type(1),
  > span:nth-of-type(3) {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;

export const Menu: React.FC = () => {
  return (
    <Root>
      <Title>SHOP</Title>
      <Content>
        <Item icon={BridgeSVG} />
        <Item icon={DaoSVG} />
        <Item icon={DexSVG} />
        <Item icon={FarmingSVG} />
        <Item icon={NodeSVG} />
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
  width: 40%;
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
  width: 90%;
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
