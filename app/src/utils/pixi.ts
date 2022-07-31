import { RefObject } from "react";
import * as PIXI from "pixi.js";

import Bridge1 from "@assets/game/Bridge1.svg";
import Bridge2 from "@assets/game/Bridge2.svg";
import Bridge3 from "@assets/game/Bridge3.svg";
import Dao1 from "@assets/game/Dao1.svg";
import Dao2 from "@assets/game/Dao2.svg";
import Dao3 from "@assets/game/Dao3.svg";
import Dex1 from "@assets/game/Dex1.svg";
import Dex2 from "@assets/game/Dex2.svg";
import Dex3 from "@assets/game/Dex3.svg";
import Network1 from "@assets/game/Network1.svg";
import Node1 from "@assets/game/Node1.svg";
import Node2 from "@assets/game/Node2.svg";
import Node3 from "@assets/game/Node3.svg";
import Staking1 from "@assets/game/Staking1.svg";
import Staking2 from "@assets/game/Staking2.svg";
import Staking3 from "@assets/game/Staking3.svg";

interface ObjectConfig {
  x: number;
  y: number;
}

enum GameObject {
  Network,
  Node,
  Dex,
  Staking,
  Dao,
  Bridge,
}
type Level = 1 | 2 | 3;

const APP: PIXI.Application = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: 1,
  backgroundColor: 0xffffff,
  resizeTo: window,
});

export const setup = (ref: RefObject<HTMLDivElement>) => {
  if (!ref.current) return;

  ref.current.appendChild(APP.view);

  const network = setupObject(createSprite(GameObject.Network, 1), {
    x: APP.renderer.width / 2,
    y: APP.renderer.height / 2,
  });
  const node = new Node({ level: 1 });

  node.add(createSprite(GameObject.Dao, 1));

  node.container.x = APP.renderer.width / 2 - 220;
  node.container.y = APP.renderer.height / 2;

  const container = new PIXI.Container();

  // Add the node to the scene we are building
  container.addChild(network);

  container.addChild(node.container);

  container.scale.set(1, 1);

  APP.stage.addChild(container);

  // // Listen for frame updates
  // APP.ticker.add(() => {
  //       // each frame we spin the node around a bit
  //     node.rotation += 0.01;
  // });
};

const GAME_TEXTURES = {
  network: {
    1: PIXI.Texture.from(Network1),
  },
  node: {
    1: PIXI.Texture.from(Node1),
    2: PIXI.Texture.from(Node2),
    3: PIXI.Texture.from(Node3),
  },
  dex: {
    1: PIXI.Texture.from(Dex1),
    2: PIXI.Texture.from(Dex2),
    3: PIXI.Texture.from(Dex3),
  },
  staking: {
    1: PIXI.Texture.from(Staking1),
    2: PIXI.Texture.from(Staking2),
    3: PIXI.Texture.from(Staking3),
  },
  dao: {
    1: PIXI.Texture.from(Dao1),
    2: PIXI.Texture.from(Dao2),
    3: PIXI.Texture.from(Dao3),
  },
  bridge: {
    1: PIXI.Texture.from(Bridge1),
    2: PIXI.Texture.from(Bridge2),
    3: PIXI.Texture.from(Bridge3),
  },
};

const createSprite = (gameObject: GameObject, level: Level): PIXI.Sprite => {
  switch (gameObject) {
    case GameObject.Network:
      return new PIXI.Sprite(GAME_TEXTURES.network[1]);
    case GameObject.Bridge:
      return new PIXI.Sprite(GAME_TEXTURES.bridge[level]);
    case GameObject.Dao:
      return new PIXI.Sprite(GAME_TEXTURES.dao[level]);
    case GameObject.Dex:
      return new PIXI.Sprite(GAME_TEXTURES.dex[level]);
    case GameObject.Staking:
      return new PIXI.Sprite(GAME_TEXTURES.staking[level]);
    case GameObject.Node:
      return new PIXI.Sprite(GAME_TEXTURES.node[level]);
    default:
      throw new Error("Undefined object");
  }
};

const setupObject = (sprite: PIXI.Sprite, { x, y }: ObjectConfig) => {
  sprite.x = x;
  sprite.y = y;

  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;

  // sprite.rotation = 0.785;

  return sprite;
};

// const Node = (level: Level) => {
//   const container = new PIXI.Container();
//   container.sortableChildren = true;

//   const nodeObject = setupObject(createSprite(GameObject.Node, level), {
//     x: 0,
//     y: 0,
//   });
//   nodeObject.zIndex = 2;

//   const line = new PIXI.Graphics();

//   // Move it to the beginning of the line
//   line.position.set(nodeObject.x, nodeObject.y);
//   line.zIndex = 1;

//   // Draw the line (endPoint should be relative to myGraph's position)

//   const dAppObject1 = setupObject(createSprite(GameObject.Dao, 1), {
//     x: -70,
//     y: 0,
//   });
//   dAppObject1.zIndex = 2;
//   const dAppObject2 = setupObject(createSprite(GameObject.Dex, 2), {
//     x: 0,
//     y: 70,
//   });
//   dAppObject2.zIndex = 2;
//   const dAppObject3 = setupObject(createSprite(GameObject.Staking, 3), {
//     x: 0,
//     y: -70,
//   });
//   dAppObject3.zIndex = 2;

//   line.lineStyle(2, 0x000).lineTo(0, 0).lineTo(dAppObject1.x, dAppObject1.y);
//   line.lineStyle(2, 0x000).lineTo(0, 0).lineTo(dAppObject2.x, dAppObject2.y);
//   line.lineStyle(2, 0x000).lineTo(0, 0).lineTo(dAppObject3.x, dAppObject3.y);

//   container.addChild(nodeObject, dAppObject1, dAppObject2, dAppObject3, line);

//   return container;
// };

class Node {
  container = new PIXI.Container();

  node: PIXI.Sprite;
  dApp1?: PIXI.Sprite;
  line1?: PIXI.Graphics;

  dApp2?: PIXI.Sprite;
  line2?: PIXI.Graphics;

  dApp3?: PIXI.Sprite;
  line3?: PIXI.Graphics;

  constructor({ level }: { level: Level }) {
    // Sort by zIndex layer
    this.container.sortableChildren = true;

    this.node = this.createObject(new PIXI.Sprite(GAME_TEXTURES.node[level]));

    this.container.addChild(this.node);
  }

  add(app: PIXI.Sprite) {
    this.dApp1 = this.createObject(app, { x: -100 });
    this.line1 = this.createLine(this.dApp1);

    this.container.addChild(this.dApp1, this.line1);
  }

  private createObject(
    object: PIXI.Sprite,
    { x, y }: { x?: number; y?: number } = { x: 0, y: 0 }
  ) {
    const dapp = object;
    dapp.zIndex = 2;
    dapp.anchor.set(0.5);
    dapp.setTransform(x, y);

    return dapp;
  }

  private createLine(object: PIXI.Sprite) {
    const line = new PIXI.Graphics();
    line.position.set(this.node.x, this.node.y);
    line.zIndex = 1;
    line.lineStyle(2, 0x000).lineTo(object.x, object.y);

    return line;
  }
}
