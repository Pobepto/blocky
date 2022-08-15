import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { ReactComponent as DexSVG } from "@assets/game/Dex.svg";
import { ReactComponent as FarmingSVG } from "@assets/game/Farming.svg";
import { ReactComponent as NodeSVG } from "@assets/game/Node.svg";
import { DAPP_GROUP } from "@src/constants";
import { useContracts, useKeyPress } from "@src/hooks";
import { useOnClickOutside } from "@src/hooks/useOnClickOutside";
import { useStore } from "@src/store";
import { clamp } from "@src/utils/clamp";

interface ItemProps {
  icon: React.FC;
  title: string;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const Item: React.FC<ItemProps> = ({
  icon: Icon,
  title,
  count,
  onIncrease,
  onDecrease,
}) => {
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

interface Cart {
  nodes: number;
  [key: string]: number;
}

const cumulativeCost = (
  baseCost: BigNumber,
  currentAmount: number,
  newAmount: number
) => {
  const a = BigNumber.from(115)
    .pow(currentAmount)
    .div(BigNumber.from(100).pow(currentAmount - 1));
  const b = BigNumber.from(115)
    .pow(newAmount)
    .div(BigNumber.from(100).pow(newAmount - 1));

  if (currentAmount === 1) {
    return baseCost.mul(b.sub(BigNumber.from(115).pow(currentAmount))).div(15);
  }

  return baseCost.mul(b.sub(a)).div(15);
};

export const Menu: React.FC<Props> = ({ close, isOpen }) => {
  const { store } = useStore();
  const { gameContract } = useContracts() ?? {};
  const menuRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Partial<Cart>>({});
  const baseCart = useRef<Partial<Cart>>({});

  useEffect(() => {
    if (store.blockchain) {
      const dappsIds = store.blockchain!.dappsIds;
      const cart = {
        0: dappsIds.filter((id) => id.toNumber() === 0).length,
        nodes: store.blockchain!.nodes.toNumber(),
      };
      setCart(cart);
      baseCart.current = cart;
    }
  }, [store.blockchain?.id?.toNumber()]);

  const isShiftPressed = useKeyPress("shift");

  const onDecrease = (key: keyof Cart) => () => {
    const base = baseCart.current[key] ?? 0;
    const current = cart[key] ?? 0;
    setCart((cart) => ({ ...cart, [key]: clamp(current - 1, base, Infinity) }));
  };

  const onIncrease = (key: keyof Cart) => () => {
    const value = isShiftPressed ? 10 : 1;
    const base = cart[key] ?? 0;
    setCart((cart) => ({ ...cart, [key]: base + value }));
  };

  const { node, dapps } = store.db;

  const onClose = () => {
    close();
    setCart({ ...baseCart.current });
  };

  useOnClickOutside(menuRef, () => onClose());

  const buy = async () => {
    const blockchainId = store.selectedBlockchainId!;

    const nodes = cart.nodes! - baseCart.current.nodes!;
    const dapps: number[] = [];
    const dappsAmounts: number[] = [];

    const tx = await gameContract!.buy(
      blockchainId,
      nodes,
      dapps,
      dappsAmounts
    );
    await tx.wait();
    baseCart.current = cart;
  };

  const nodeBasePrice = node?.price ?? BigNumber.from(0);
  const total = cumulativeCost(
    nodeBasePrice,
    baseCart.current?.nodes ?? 1,
    cart?.nodes ?? 1
  );

  return (
    <Root ref={menuRef} isOpen={isOpen}>
      <Title>SHOP</Title>
      <Content>
        <Category>Decentralized apps</Category>
        {(dapps ?? []).map((dapp) => (
          <Item
            key={`${dapp.group}${dapp.kind}`}
            count={cart[dapp.group] ?? 0}
            icon={DAppsIcons[dapp.group]}
            title={DAppsTitles[dapp.group]}
            onDecrease={onDecrease(dapp.group)}
            onIncrease={onIncrease(dapp.group)}
          />
        ))}
        <Category>Environment</Category>
        <Item
          count={cart.nodes ?? 0}
          icon={NodeSVG}
          title="Node"
          onDecrease={onDecrease("nodes")}
          onIncrease={onIncrease("nodes")}
        />
      </Content>
      <div>
        <span>Total:</span>
        <span>{total.div(100).toString()}</span>
      </div>
      <Footer>
        <span onClick={() => onClose()}>CANCEL</span>
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
