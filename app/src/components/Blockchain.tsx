import React from "react";
import styled from "@emotion/styled";

import { BlockRain, BlockType } from "./Block";
import { Level } from "./GameObject";
import { Node } from "./Node";
import { OffsetBlock } from "./OffsetBlock";

interface Props {
  level: Level;
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
  // return (
  //   <Container>
  //     <DApp1Block>
  //       <GameObject level={1} type={GameObjectType.Dao} />
  //     </DApp1Block>
  //     <LineTopBlock>
  //       <Line />
  //     </LineTopBlock>
  //     <LineLeftBlock>
  //       <Line />
  //     </LineLeftBlock>
  //     <LineBottomBlock>
  //       <Line />
  //     </LineBottomBlock>
  //     <LineRightBlock>
  //       <Line />
  //     </LineRightBlock>

  //     <DApp2Block>
  //       <GameObject level={1} type={GameObjectType.Dex} />
  //     </DApp2Block>
  //     <DApp3Block>
  //       <GameObject level={1} type={GameObjectType.Staking} />
  //     </DApp3Block>
  //     <NodeBlock>
  //       <GameObject level={level} type={GameObjectType.Node} />
  //     </NodeBlock>
  //   </Container>
  // );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
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

// const Container = styled.div`
//   position: relative;

//   display: grid;
//   grid-template-columns: 1fr 20px 1fr 20px 1fr;
//   grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
//   gap: 0px 0px;
//   grid-template-areas:
//     ".     . DApp1 .    ."
//     ".     .  LT   .    ."
//     "DApp2 LL Node LR Network"
//     ".     .  LB   .    ."
//     ".     . DApp3 .    .";
// `;

// const Line = styled.div`
//   height: 1px;
//   width: 100%;
//   border-top: 1px dashed #283618;
// `;

// const NetworkBlock = styled.div`
//   grid-area: Network;
// `;
// const LineTopBlock = styled.div`
//   grid-area: LT;
//   transform: rotate(90deg);

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const LineLeftBlock = styled.div`
//   grid-area: LL;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const LineBottomBlock = styled.div`
//   grid-area: LB;
//   transform: rotate(90deg);

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const LineRightBlock = styled.div`
//   grid-area: LR;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const NodeBlock = styled.div`
//   grid-area: Node;
//   transform: rotate(45deg);
// `;
// const DApp1Block = styled.div`
//   grid-area: DApp1;
//   transform: rotate(180deg);
// `;
// const DApp2Block = styled.div`
//   grid-area: DApp2;
//   transform: rotate(-90deg);
// `;
// const DApp3Block = styled.div`
//   grid-area: DApp3;
//   transform: rotate(180deg);
// `;

// const AbsoluteBlock = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;

//   &:nth-of-type(1) {
//     top: 0;
//     left: -100px;
//     transform: rotate(90deg);
//   }
//   &:nth-of-type(2) {
//     top: 100px;
//     left: 0;
//     /* transform: translate(-50%, -50%); */
//   }
//   &:nth-of-type(3) {
//     top: -100px;
//     left: 0;
//     /* transform: translate(-50%, -50%); */
//   }
//   &:nth-of-type(4) {
//     top: 0;
//     left: 0;
//     transform: rotate(45deg);
//     /* transform: translate(-50%, -50%); */
//   }
// `;
