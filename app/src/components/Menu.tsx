import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { ReactComponent as DexSVG } from "@assets/game/Dex.svg";
import { ReactComponent as FarmingSVG } from "@assets/game/Farming.svg";
import { ReactComponent as NodeSVG } from "@assets/game/Node.svg";
import { DAPP_GROUP } from "@src/constants";
import { useContracts, useKeyPress } from "@src/hooks";
import { useStore } from "@src/store";
import { BN } from "@src/utils/BN";
import { clamp } from "@src/utils/clamp";

import { Sidebar } from "./Sidebar";

interface ItemProps {
  icon: React.FC;
  title: string;
  initialCount: number;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const Item: React.FC<ItemProps> = ({
  icon: Icon,
  title,
  initialCount,
  count,
  onIncrease,
  onDecrease,
}) => {
  const isChanged = initialCount !== count;

  return (
    <ItemRoot>
      <Icon />
      <ContentBlock>
        <span>{title.toUpperCase()}</span>
        <span style={{ fontSize: "12px" }}>TPS: -2, L/S: 10</span>
      </ContentBlock>
      {/* <span style={{ fontSize: "12px" }}>
        {title} dklsdksldksldsk dksldk lkdsl kdls kdsl kdl
      </span> */}
      <CounterBlock isChanged={isChanged}>
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

const ContentBlock = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 8px;
`;

const CounterBlock = styled.div<{ isChanged: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  user-select: none;

  > span:nth-of-type(1),
  > span:nth-of-type(3) {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.color};
    }
  }

  > span:nth-of-type(2) {
    color: ${({ theme, isChanged }) =>
      isChanged ? theme.color : theme.colors.white};
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
  const b = BigNumber.from(115)
    .pow(newAmount)
    .div(BigNumber.from(100).pow(newAmount - 1));

  if (currentAmount === 0) {
    return baseCost.mul(b.sub(100)).div(15);
  }

  if (currentAmount === 1) {
    return baseCost.mul(b.sub(BigNumber.from(115).pow(currentAmount))).div(15);
  }

  const a = BigNumber.from(115)
    .pow(currentAmount)
    .div(BigNumber.from(100).pow(currentAmount - 1));

  return baseCost.mul(b.sub(a)).div(15);
};

export const Menu: React.FC<Props> = ({ close, isOpen }) => {
  const { store } = useStore();
  const { gameContract } = useContracts() ?? {};
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
    console.log("isShiftPressed", isShiftPressed);
    const value = isShiftPressed ? 10 : 1;
    const base = cart[key] ?? 0;
    setCart((cart) => ({ ...cart, [key]: base + value }));
  };

  const { node, dapps } = store.db;

  const onClose = () => {
    close();
    setCart({ ...baseCart.current });
  };

  const buy = async () => {
    const blockchainId = store.selectedBlockchainId!;

    const nodes = cart.nodes! - baseCart.current.nodes!;
    const { dapps, dappsAmounts } = getDappsFromCart();

    const tx = await gameContract!.buy(
      blockchainId,
      nodes,
      dapps,
      dappsAmounts
    );
    await tx.wait();
    baseCart.current = cart;
  };

  const getDappsFromCart = () => {
    const dapps = [];
    const dappsAmounts = [];

    for (const [dappId, amount] of Object.entries(cart)) {
      if (dappId === "nodes" || baseCart.current[dappId] === amount) continue;

      const buyAmount = amount! - (baseCart.current[dappId] ?? 0);

      dapps.push(dappId);
      dappsAmounts.push(buyAmount);
    }

    return {
      dapps,
      dappsAmounts,
    };
  };

  const calculateTotalCost = () => {
    const nodeBasePrice = node?.price ?? BigNumber.from(0);
    const totalNodeCost = cumulativeCost(
      nodeBasePrice,
      baseCart.current?.nodes ?? 1,
      cart?.nodes ?? 1
    );

    const { dapps } = getDappsFromCart();

    let totalDappsCost = BigNumber.from(0);

    for (const dappId of dapps) {
      const dappData = store.db.dapps!.find(
        (dapp) => dapp.group === parseInt(dappId)
      );

      const baseDappPrice = dappData?.price ?? BigNumber.from(0);
      const dappPrice = cumulativeCost(
        baseDappPrice,
        baseCart.current[dappId] ?? 1,
        cart[dappId] ?? 1
      );
      totalDappsCost = totalDappsCost.add(dappPrice);
    }

    return totalNodeCost.add(totalDappsCost);
  };

  const total = calculateTotalCost();

  return (
    <Sidebar close={onClose} isOpen={isOpen} title="SHOP">
      <Content>
        <Category>Decentralized apps</Category>
        {(dapps ?? []).map((dapp) => (
          <Item
            key={`${dapp.group}${dapp.kind}`}
            count={cart[dapp.group] ?? 0}
            icon={DAppsIcons[dapp.group]}
            initialCount={baseCart.current[dapp.group] ?? 0}
            title={DAppsTitles[dapp.group]}
            onDecrease={onDecrease(dapp.group)}
            onIncrease={onIncrease(dapp.group)}
          />
        ))}
        <Category>Environment</Category>
        <Item
          count={cart.nodes ?? 0}
          icon={NodeSVG}
          initialCount={baseCart.current.nodes ?? 0}
          title="Node"
          onDecrease={onDecrease("nodes")}
          onIncrease={onIncrease("nodes")}
        />
      </Content>
      <TotalBlock>
        <span>Total:</span>
        <span>{BN.formatUnits(total, 2).toString()}</span>
      </TotalBlock>
      <Footer>
        <span onClick={() => onClose()}>CANCEL</span>
        <span onClick={buy}>BUY</span>
      </Footer>
    </Sidebar>
  );
};

const TotalBlock = styled.div`
  margin-bottom: 16px;
  user-select: none;

  span:nth-of-type(1) {
    margin-right: 8px;
  }
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
      color: ${({ theme }) => theme.color};
    }
  }
`;
