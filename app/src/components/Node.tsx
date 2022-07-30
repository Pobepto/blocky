import React from "react";
import styled from "@emotion/styled";

import { GameObject, GameObjectType, Level } from "./GameObject";

interface Props {
  level: Level;
}

export const Node: React.FC<Props> = ({ level }) => {
  return (
    <Container>
      <DApp1Block>
        <GameObject level={1} type={GameObjectType.Dao} />
      </DApp1Block>
      <LineTopBlock>
        <Line />
      </LineTopBlock>
      <LineLeftBlock>
        <Line />
      </LineLeftBlock>
      <LineBottomBlock>
        <Line />
      </LineBottomBlock>
      <LineRightBlock>
        <Line />
      </LineRightBlock>

      <DApp2Block>
        <GameObject level={1} type={GameObjectType.Dex} />
      </DApp2Block>
      <DApp3Block>
        <GameObject level={1} type={GameObjectType.Staking} />
      </DApp3Block>
      <NodeBlock>
        <GameObject level={level} type={GameObjectType.Node} />
      </NodeBlock>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: 1fr 20px 1fr 20px 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ".     . DApp1 .    ."
    ".     .  LT   .    ."
    "DApp2 LL Node LR Network"
    ".     .  LB   .    ."
    ".     . DApp3 .    .";
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  border-top: 1px dashed #283618;
`;

const NetworkBlock = styled.div`
  grid-area: Network;
`;
const LineTopBlock = styled.div`
  grid-area: LT;
  transform: rotate(90deg);

  display: flex;
  align-items: center;
  justify-content: center;
`;
const LineLeftBlock = styled.div`
  grid-area: LL;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const LineBottomBlock = styled.div`
  grid-area: LB;
  transform: rotate(90deg);

  display: flex;
  align-items: center;
  justify-content: center;
`;
const LineRightBlock = styled.div`
  grid-area: LR;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const NodeBlock = styled.div`
  grid-area: Node;
  transform: rotate(45deg);
`;
const DApp1Block = styled.div`
  grid-area: DApp1;
  transform: rotate(180deg);
`;
const DApp2Block = styled.div`
  grid-area: DApp2;
  transform: rotate(-90deg);
`;
const DApp3Block = styled.div`
  grid-area: DApp3;
  transform: rotate(180deg);
`;

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
