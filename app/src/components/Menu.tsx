import React, { useRef, useState } from "react";
import styled from "@emotion/styled";

import { ReactComponent as DexSVG } from "@assets/game/Dex.svg";
import { ReactComponent as FarmingSVG } from "@assets/game/Farming.svg";
import { ReactComponent as NodeSVG } from "@assets/game/Node.svg";
import { DAPP_GROUP } from "@src/constants";
import { useContracts } from "@src/hooks";
import { useKeyPress } from "@src/hooks/useKeyPress";
import { useOnClickOutside } from "@src/hooks/useOnClickOutside";
import { useStore } from "@src/store";

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
  align-items: center;
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
  isOpen: boolean;
}

const DAppsIcons = {
  [DAPP_GROUP.DEFI]: DexSVG,
  [DAPP_GROUP.GAMEFI]: FarmingSVG,
};

const DAppsTitles = {
  [DAPP_GROUP.DEFI]: "Dex",
  [DAPP_GROUP.GAMEFI]: "Gamefi",
};

export const Menu: React.FC<Props> = ({ close, isOpen }) => {
  const { store } = useStore();
  const { gameContract } = useContracts() ?? {};
  const menuRef = useRef<HTMLDivElement>(null);

  const { node, dapps } = store.db;

  useOnClickOutside(menuRef, () => close());

  if (!node || !dapps) {
    return (
      <Root isOpen={isOpen}>
        <div style={{ margin: "auto" }}>Connect wallet first</div>
      </Root>
    );
  }

  const buy = async () => {
    const blockchainId = store.selectedBlockchainId!;
    const tx = await gameContract!.buyNode(blockchainId);
    await tx.wait();
  };

  return (
    <Root ref={menuRef} isOpen={isOpen}>
      <Title>SHOP</Title>
      <Content>
        <Category>Decentralized apps</Category>
        {dapps.map((dapp) => (
          <Item
            key={`${dapp.group}${dapp.kind}`}
            icon={DAppsIcons[dapp.group]}
            title={DAppsTitles[dapp.group]}
          />
        ))}
        <Category>Environment</Category>
        <Item icon={NodeSVG} title="Node" />
      </Content>
      <Footer>
        <span onClick={close}>CANCEL</span>
        <span onClick={buy}>BUY</span>
      </Footer>
    </Root>
  );
};

const Root = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 550px;
  height: 100vh;
  border-left: 2px solid ${({ theme }) => theme.colors.yellow};
  background: #00000099;
  top: 0;
  right: 0;
  z-index: 1;
  transition: right 0.3s ease-in-out;
  right: ${({ isOpen }) => (isOpen ? "0" : "-550px")};
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
