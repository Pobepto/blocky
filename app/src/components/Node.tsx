import React from "react";
import styled from "@emotion/styled";

// import { ReactComponent as DexSVG } from "@assets/game2/Dex.svg";
import { ReactComponent as DaoSVG } from "@assets/game2/Dao.svg";
import { ReactComponent as NodeSVG } from "@assets/game2/Node.svg";

import { OffsetBlock } from "./OffsetBlock";

interface IProps {
  dapps: any[];
  reverse: boolean;
}

export const Node: React.FC<IProps> = ({ dapps, reverse }) => {
  const lineTopOffset = (44 / 2 + 40) * (reverse ? 1 : -1);
  return (
    <Container>
      {dapps.map((_, index) => {
        const dappTopOffset = (125 + index * 60) * (reverse ? 1 : -1);

        return (
          <OffsetBlock key={index} left={0} top={dappTopOffset}>
            <DaoSVG />
          </OffsetBlock>
        );
      })}
      <OffsetBlock left={-5} top={lineTopOffset}>
        <VerticalLine height={44} />
      </OffsetBlock>
      <OffsetBlock left={5} top={lineTopOffset}>
        <VerticalLine height={44} />
      </OffsetBlock>
      <NodeSVG />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const VerticalLine = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  width: 0;
  border: 2px dashed #fff;
`;
