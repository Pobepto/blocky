import React from "react";

import { GameObject, GameObjectType, Level } from "./GameObject";

interface Props {
  level: Level;
}

export const Network: React.FC<Props> = ({ level }) => {
  return <GameObject level={level} type={GameObjectType.Network} />;
};
