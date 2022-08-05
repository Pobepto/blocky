import React from "react";
import styled from "@emotion/styled";

import { BlockRain, BlockType } from "./Block";
import { Node } from "./Node";
import { OffsetBlock } from "./OffsetBlock";

interface Props {
  level: number;
}

export const Blockchain: React.FC<Props> = ({ level }) => {
  const nodes1Amount = 5;

  const half = nodes1Amount / 2;
  const leftHalf = Math.floor(half);
  const rightHalf = Math.ceil(half);

  const randomDuration = () => {
    return 1 + Math.random();
  };

  return (
    <Container>
      <OffsetBlock left={0} top={250}>
        <BlockRain
          colors={[
            BlockType.BLUE,
            BlockType.GREEN,
            BlockType.ORANGE,
            BlockType.RED,
            BlockType.YELLOW,
          ]}
          reverse
        />
      </OffsetBlock>
      <ChainCore>
        <PulsationCircle />
      </ChainCore>
      <OffsetBlock left={0} top={-200}>
        <BlockRain />
      </OffsetBlock>
      {Array.from(Array(leftHalf)).map((_, index) => {
        const nodeLeftOffset = -(275 + index * 125);
        const lineWidth = index === 0 ? 115 : 45;
        const lineLeftOffset = lineWidth / 2 + 40;

        return (
          <OffsetBlock key={index} left={nodeLeftOffset} top={0}>
            <Node dapps={[1]} reverse={index % 2 === 0} />
            <OffsetBlock left={lineLeftOffset} top={-5}>
              <HorizontalLine duration={randomDuration} width={lineWidth} />
            </OffsetBlock>
            <OffsetBlock left={lineLeftOffset} top={5}>
              <HorizontalLine
                duration={randomDuration}
                width={lineWidth}
                reverse
              />
            </OffsetBlock>
          </OffsetBlock>
        );
      })}
      {Array.from(Array(rightHalf)).map((_, index) => {
        const nodeLeftOffset = 275 + index * 125;
        const lineWidth = index === 0 ? 115 : 45;
        const lineLeftOffset = -(lineWidth / 2 + 40);

        return (
          <OffsetBlock key={index} left={nodeLeftOffset} top={0}>
            <Node dapps={[1, 2]} reverse={index % 2 === 0} />
            <OffsetBlock left={lineLeftOffset} top={-5}>
              <HorizontalLine
                duration={randomDuration}
                width={lineWidth}
                reverse
              />
            </OffsetBlock>
            <OffsetBlock left={lineLeftOffset} top={5}>
              <HorizontalLine duration={randomDuration} width={lineWidth} />
            </OffsetBlock>
          </OffsetBlock>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow-y: hidden;
`;

const ChainCore = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #fff;
  background-color: transparent;
  position: relative;
  display: flex;
`;

const PulsationCircle = styled.div`
  margin: auto;
  width: 180px;
  height: 180px;
  position: relative;

  @keyframes pulse-ring {
    0% {
      transform: scale(0.3);
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    0% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.5);
    }
  }

  &:before {
    content: "";
    position: relative;
    display: block;
    width: 150%;
    height: 150%;
    box-sizing: border-box;
    margin-left: -25%;
    margin-top: -25%;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.yellow};
    animation: pulse-ring 2.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.yellow};
    border-radius: 50%;
    animation: pulse-dot 2.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  }
`;

const HorizontalLine = styled.div<{
  width: number;
  duration: () => number;
  reverse?: boolean;
}>`
  width: ${({ width }) => `${width}px`};
  height: 0;
  position: relative;
  top: -1px;
  border-top: 2px dashed #fff;

  @keyframes move {
    0% {
      left: 100%;
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
      left: 0%;
      opacity: 0;
    }
  }

  :after {
    content: "";
    display: block;
    position: relative;
    width: 6px;
    height: 6px;
    top: -4px;
    background: ${({ theme, reverse }) =>
      reverse ? theme.colors.yellow : "gray"};
    animation: move ${({ duration }) => duration()}s ease-in-out infinite;
    animation-direction: ${({ reverse }) => (reverse ? "reverse" : "normal")};
  }
`;
