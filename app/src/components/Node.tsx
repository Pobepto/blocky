import React from "react";
import styled from "@emotion/styled";

import { GameObject, GameObjectType, Level } from "./GameObject";

interface Props {
  level: Level;
}

export const Node: React.FC<Props> = ({ level }) => {
  return (
    <Container>
      <GameObject level={level} type={GameObjectType.Node} />
    </Container>
  );
};

const Container = styled.div``;
