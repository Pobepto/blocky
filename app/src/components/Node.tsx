import React from "react";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";

import { ReactComponent as DexSVG } from "@assets/game/Dex.svg";
import { ReactComponent as NodeSVG } from "@assets/game/Node.svg";
import { DappIds } from "@src/constants";

import { OffsetBlock } from "./OffsetBlock";

interface IProps {
  dapps: BigNumber[];
  reverse: boolean;
}

const DAPP_MAP: Record<
  DappIds,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  0: DexSVG,
};

export const Node: React.FC<IProps> = ({ dapps, reverse }) => {
  const lineTopOffset = (44 / 2 + 40) * (reverse ? 1 : -1);

  const randomDuration = () => 1 + Math.random();

  return (
    <Container>
      {dapps.map((id, index) => {
        const dappTopOffset = (125 + index * 60) * (reverse ? 1 : -1);
        const Icon = DAPP_MAP[id.toNumber() as DappIds];

        return (
          <OffsetBlock key={index} left={0} top={dappTopOffset}>
            <Icon />
          </OffsetBlock>
        );
      })}
      {dapps.length > 0 && (
        <>
          <OffsetBlock left={-5} top={lineTopOffset}>
            <VerticalLine duration={randomDuration} height={44} />
          </OffsetBlock>
          <OffsetBlock left={5} top={lineTopOffset}>
            <VerticalLine duration={randomDuration} height={44} reverse />
          </OffsetBlock>
        </>
      )}
      <NodeSVG />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const VerticalLine = styled.div<{
  height: number;
  duration: () => number;
  reverse?: boolean;
}>`
  height: ${({ height }) => `${height}px`};
  width: 0;
  position: relative;
  left: 1px;
  border-left: 2px dashed #fff;

  @keyframes moveVertical {
    0% {
      top: 100%;
      opacity: 0;
    }
    5% {
      opacity: 0.75;
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    95% {
      opacity: 0.75;
    }
    100% {
      top: 0%;
      opacity: 0;
    }
  }

  :after {
    content: "";
    display: block;
    position: relative;
    width: 6px;
    height: 6px;
    left: -4px;
    background: ${({ theme, reverse }) => (reverse ? theme.color : "gray")};
    animation: moveVertical ${({ duration }) => duration()}s ease-in-out
      infinite;
    animation-direction: ${({ reverse }) => (reverse ? "reverse" : "normal")};
  }
`;
