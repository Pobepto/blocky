import React from "react";
import styled from "@emotion/styled";

import defaultImg from "@assets/game/block/Block.svg";
import blueImg from "@assets/game/block/BlueBlock.svg";
import greenImg from "@assets/game/block/GreenBlock.svg";
import orangeImg from "@assets/game/block/OrangeBlock.svg";
import redImg from "@assets/game/block/RedBlock.svg";
import yellowImg from "@assets/game/block/YellowBlock.svg";
import { DappIds } from "@src/constants";

export enum BlockType {
  DEFAULT,
  BLUE,
  GREEN,
  ORANGE,
  RED,
  YELLOW,
}

interface Props {
  colors?: BlockType[];
  reverse?: boolean;
}

interface RainProps {
  colors?: BlockType[];
  reverse?: boolean;
}

export const MAP_IDS_TYPE: Record<DappIds, BlockType> = {
  [0]: BlockType.YELLOW,
};

const MAP_COLOR_IMG = {
  [BlockType.DEFAULT]: defaultImg,
  [BlockType.BLUE]: blueImg,
  [BlockType.GREEN]: greenImg,
  [BlockType.ORANGE]: orangeImg,
  [BlockType.RED]: redImg,
  [BlockType.YELLOW]: yellowImg,
};

export const Block: React.FC<Props> = ({
  colors = [BlockType.DEFAULT],
  reverse = false,
}) => {
  const currentImage =
    MAP_COLOR_IMG[colors[Math.floor(Math.random() * colors.length)]];

  const duration = Math.random() * 2 + 1;

  return <Image duration={duration} reverse={reverse} src={currentImage} />;
};

// eslint-disable-next-line react/display-name
export const BlockRain: React.FC<RainProps> = React.memo(
  ({ colors, reverse }) => {
    const blocks = 9;

    return (
      <Root>
        {Array.from(Array(blocks), (_, index) => (
          <Block key={index} colors={colors} reverse={reverse} />
        ))}
      </Root>
    );
  }
);

const Root = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;
  width: 200px;

  @keyframes fall {
    0% {
      top: 0px;
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      top: 300px;
      opacity: 0;
    }
  }
  @keyframes fall-reverse {
    0% {
      top: 0px;
      opacity: 0;
    }
    5% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      top: 300px;
      opacity: 0;
    }
  }
`;

const Image = styled.img<{ duration: number; reverse: boolean }>`
  position: relative;
  width: 10px;
  height: 40px;
  top: 0;
  z-index: -1;
  animation: ${({ reverse }) => (reverse ? "fall-reverse" : "fall")}
    ${({ duration }) => `${duration}s`} linear infinite;
`;
