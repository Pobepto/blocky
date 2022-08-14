import React, { useState } from "react";
import styled from "@emotion/styled";

import { ReactComponent as BridgeSVG } from "@assets/game/Bridge.svg";
import { ReactComponent as DaoSVG } from "@assets/game/Dao.svg";
import { ReactComponent as DexSVG } from "@assets/game/Dex.svg";
import { ReactComponent as FarmingSVG } from "@assets/game/Farming.svg";
import { ReactComponent as NodeSVG } from "@assets/game/Node.svg";
import { useKeyPress } from "@src/hooks/useKeyPress";

interface ItemProps {
  icon: React.FC;
  title: string;
}

const Item: React.FC<ItemProps> = ({ icon: Icon, title }) => {
  const [count, setCount] = useState(0);
  const isShiftPressed = useKeyPress("shift");

  const onDecrease = () => {
    if (count - 1 < 0) {
      setCount(0);
      return;
    }
    setCount(count - 1);
  };

  const onIncrease = () => {
    const value = isShiftPressed ? 10 : 1;
    setCount((v) => v + value);
  };

  return (
    <ItemRoot>
      <Icon />
      <span style={{ fontSize: "12px" }}>{title}</span>
      <CounterBlock>
        <span onClick={onDecrease}>-</span>
        <span>{count}</span>
        <span onClick={onIncrease}>+</span>
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
  user-select: none;

  > span:nth-of-type(1),
  > span:nth-of-type(3) {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;

interface Props {
  close: () => void;
}

export const Menu: React.FC<Props> = ({ close }) => {
  return (
    <Root>
      <Title>SHOP</Title>
      <Content>
        <Category>Decentralized apps</Category>
        <Item icon={BridgeSVG} title="Bridge" />
        <Item icon={DaoSVG} title="Dao" />
        <Item icon={DexSVG} title="Dex" />
        <Item icon={FarmingSVG} title="Farming" />
        <Category>Environment</Category>
        <Item icon={NodeSVG} title="Node" />
      </Content>
      <Footer>
        <span onClick={close}>CANCEL</span>
        <span>BUY</span>
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 550px;
  height: 100vh;
  border-left: 2px solid ${({ theme }) => theme.colors.yellow};
  background: #00000090;
  top: 0;
  right: 0;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  flex-grow: 1;
  width: 90%;
`;

const Category = styled.span`
  font-size: 16px;
`;

const Footer = styled.div`
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

const Title = styled.span`
  font-size: 20px;
  padding-top: 50px;
  margin-bottom: 20px;
`;
