import React from "React";

import { GAME_OBJECTS } from "../constants";

export enum GameObjectType {
  Network,
  Node,
  Dex,
  Staking,
  Dao,
  Bridge,
}

export type Level = 1 | 2 | 3;

interface Props {
  type: GameObjectType;
  level: Level;
}

const getGameObjectSvg = (gameObject: GameObjectType, level: Level): string => {
  switch (gameObject) {
    case GameObjectType.Network:
      return GAME_OBJECTS.network[1];
    case GameObjectType.Bridge:
      return GAME_OBJECTS.bridge[level];
    case GameObjectType.Dao:
      return GAME_OBJECTS.dao[level];
    case GameObjectType.Dex:
      return GAME_OBJECTS.dex[level];
    case GameObjectType.Staking:
      return GAME_OBJECTS.staking[level];
    case GameObjectType.Node:
      return GAME_OBJECTS.node[level];
    default:
      throw new Error("Undefined object");
  }
};

export const GameObject: React.FC<Props> = ({ type, level }) => {
  const svg = getGameObjectSvg(type, level);
  return <img src={svg} />;
};
