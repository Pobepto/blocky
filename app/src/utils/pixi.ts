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

  const network = new Network({ level: 1 });

  network.container.x = APP.renderer.width / 2;
  network.container.y = APP.renderer.height / 2;

  const node = new Node({ level: 1 });

  node.add(createSprite(GameObject.Dao, 1));

  network.add(node);

  const container = new PIXI.Container();

  container.addChild(network.container);

  APP.stage.addChild(container);
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

interface BaseConfig {
  level: Level;
  rootTexture: PIXI.Texture;
}

class Base {
  container = new PIXI.Container();
  root = new PIXI.Sprite();

  level: Level = 1;

  constructor({ level, rootTexture }: BaseConfig) {
    // Sort by zIndex layer
    this.container.sortableChildren = true;
    this.level = level;
    this.root = this.createObject(new PIXI.Sprite(rootTexture));

    this.container.addChild(this.root);
  }

  protected createObject(
    object: PIXI.Sprite,
    { x, y }: { x?: number; y?: number } = { x: 0, y: 0 }
  ) {
    const dapp = object;
    dapp.zIndex = 2;
    dapp.anchor.set(0.5);
    dapp.setTransform(x, y);

    return dapp;
  }

  protected createLine(x: number, y: number) {
    const line = new PIXI.Graphics();
    line.position.set(this.root.x, this.root.y);
    line.zIndex = 1;
    line.lineStyle(2, 0x000).lineTo(x, y);

    return line;
  }
}
class Network extends Base {
  // TODO: Think about storing data in array instead several variables
  //       same for Node class
  node1?: Node;
  line1?: PIXI.Graphics;

  node2?: Node;
  line2?: PIXI.Graphics;

  node3?: Node;
  line3?: PIXI.Graphics;

  node4?: Node;
  line4?: PIXI.Graphics;

  constructor({ level }: Omit<BaseConfig, "rootTexture">) {
    // TODO: Add more networks
    const rootTexture = GAME_TEXTURES.network[1];
    super({ level, rootTexture });
  }

  add(node: Node) {
    this.node1 = node;

    this.node1.container.x = -220;
    this.node1.container.y = 0;

    this.line1 = this.createLine(
      this.node1.container.x,
      this.node1.container.y
    );

    this.container.addChild(this.node1.container, this.line1);
  }
}

class Node extends Base {
  dApp1?: PIXI.Sprite;
  line1?: PIXI.Graphics;

  dApp2?: PIXI.Sprite;
  line2?: PIXI.Graphics;

  dApp3?: PIXI.Sprite;
  line3?: PIXI.Graphics;

  constructor({ level }: Omit<BaseConfig, "rootTexture">) {
    const rootTexture = GAME_TEXTURES.node[level];
    super({ level, rootTexture });
  }

  add(app: PIXI.Sprite) {
    this.dApp1 = this.createObject(app, { x: -100 });
    this.line1 = this.createLine(this.dApp1.x, this.dApp1.y);

    this.container.addChild(this.dApp1, this.line1);
  }
}
