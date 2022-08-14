import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { useContracts } from "@src/hooks";
import { useBlockchain } from "@src/hooks/useBlockchain";
import { clamp } from "@src/utils/clamp";

import { BlockRain, BlockType } from "./BlockRain";
import { Node } from "./Node";
import { OffsetBlock } from "./OffsetBlock";
import { Spinner } from "./Spinner";

interface Props {
  id: number;
}

let zoom = 1;
const zoomStep = 0.025;
const zoomInLimit = 1;
const zoomOutLimit = 0.5;

const randomDuration = () => 1 + Math.random();

export const Blockchain: React.FC<Props> = ({ id }) => {
  const { blockchain, isLoading } = useBlockchain(id);

  const chainRef = useRef<HTMLDivElement>(null);

  const nodesAmount = blockchain ? blockchain.nodes.toNumber() : 0;

  const half = nodesAmount / 2;
  const leftHalf = Math.floor(half);
  const rightHalf = Math.ceil(half);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!chainRef.current) return;

      if (e.deltaY > 0) {
        zoom = zoom - zoomStep;
      } else {
        zoom = zoom + zoomStep;
      }

      zoom = clamp(zoom, zoomOutLimit, zoomInLimit);

      chainRef.current.style.transform = `scale(${zoom})`;
    };

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const renderNodes = (amount: number, position: "left" | "right") => {
    const reverse = position === "left" ? -1 : 1;

    return Array.from(Array(amount)).map((_, index) => {
      const nodeLeftOffset = (275 + index * 125) * reverse;
      const lineWidth = index === 0 ? 115 : 45;
      const lineLeftOffset = (lineWidth / 2 + 40) * -reverse;

      return (
        <OffsetBlock key={index} left={nodeLeftOffset} top={0}>
          <Node
            dapps={Array.from(Array(amount - index))}
            reverse={index % 2 === 0}
          />
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
    });
  };

  if (isLoading) {
    return (
      <Root>
        <Spinner />
      </Root>
    );
  }

  return (
    <Root>
      <Container ref={chainRef}>
        <OffsetBlock left={0} top={-200}>
          <BlockRain />
        </OffsetBlock>
        <ChainCore>
          <PulsationCircle />
        </ChainCore>
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
        {renderNodes(leftHalf, "left")}
        {renderNodes(rightHalf, "right")}
      </Container>
    </Root>
  );
};

export const CreateBlockchain: React.FC = () => {
  const [isCreating, setCreating] = useState(false);
  const { gameContract } = useContracts();

  const createBlockchain = async () => {
    try {
      setCreating(true);
      const tx = await gameContract.createBlockchain();
      await tx.wait();
    } catch (error) {
      setCreating(false);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Root>
      <Container>
        {isCreating ? (
          <Spinner />
        ) : (
          <CreateBlockchainButton onClick={createBlockchain}>
            Create blockchain
          </CreateBlockchainButton>
        )}
      </Container>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

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

const CreateBlockchainButton = styled(ChainCore)`
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
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
