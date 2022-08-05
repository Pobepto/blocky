import React from "react";
import styled from "@emotion/styled";

import defaultImg from "@assets/game2/block/Block.svg";
import blueImg from "@assets/game2/block/BlueBlock.svg";
import greenImg from "@assets/game2/block/GreenBlock.svg";
import orangeImg from "@assets/game2/block/OrangeBlock.svg";
import redImg from "@assets/game2/block/RedBlock.svg";
import yellowImg from "@assets/game2/block/YellowBlock.svg";

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

export const BlockRain: React.FC<RainProps> = ({ colors, reverse }) => {
  return (
    <Root>
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      {/* <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} />
      <Block colors={colors} reverse={reverse} /> */}
    </Root>
  );
};

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
