import { Application, Container, Graphics, Sprite, Texture } from "pixi.js";

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

const degToRad = (deg: number) => deg * (Math.PI / 180);
const radToDeg = (rad: number) => rad * (180 / Math.PI);

enum GameObject {
  Network,
  Node,
  Dex,
  Staking,
  Dao,
  Bridge,
}
type Level = 1 | 2 | 3;

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: 1,
  backgroundColor: 0xffffff,
  resizeTo: window,
});

export const setup = (domContainer: HTMLDivElement) => {
  domContainer.appendChild(app.view);

  const network = new Network({ level: 1 });

  network.container.x = app.renderer.width / 2;
  network.container.y = app.renderer.height / 2;

  for (let i = 0; i < 10; i++) {
    const node = new Node({ level: 1 });

    node.add(createSprite(GameObject.Dao, 1));
    network.add(node);
  }

  const container = new Container();

  container.addChild(network.container);

  app.stage.addChild(container);
};

const GAME_TEXTURES = {
  network: {
    1: Texture.from(Network1),
  },
  node: {
    1: Texture.from(Node1),
    2: Texture.from(Node2),
    3: Texture.from(Node3),
  },
  dex: {
    1: Texture.from(Dex1),
    2: Texture.from(Dex2),
    3: Texture.from(Dex3),
  },
  staking: {
    1: Texture.from(Staking1),
    2: Texture.from(Staking2),
    3: Texture.from(Staking3),
  },
  dao: {
    1: Texture.from(Dao1),
    2: Texture.from(Dao2),
    3: Texture.from(Dao3),
  },
  bridge: {
    1: Texture.from(Bridge1),
    2: Texture.from(Bridge2),
    3: Texture.from(Bridge3),
  },
};

const createSprite = (gameObject: GameObject, level: Level): Sprite => {
  switch (gameObject) {
    case GameObject.Network:
      return new Sprite(GAME_TEXTURES.network[1]);
    case GameObject.Bridge:
      return new Sprite(GAME_TEXTURES.bridge[level]);
    case GameObject.Dao:
      return new Sprite(GAME_TEXTURES.dao[level]);
    case GameObject.Dex:
      return new Sprite(GAME_TEXTURES.dex[level]);
    case GameObject.Staking:
      return new Sprite(GAME_TEXTURES.staking[level]);
    case GameObject.Node:
      return new Sprite(GAME_TEXTURES.node[level]);
    default:
      throw new Error("Undefined object");
  }
};

interface BaseConfig {
  level: Level;
  rootTexture: Texture;
}

class Base {
  container = new Container();
  root = new Sprite();

  level: Level = 1;

  constructor({ level, rootTexture }: BaseConfig) {
    // Sort by zIndex layer
    this.container.sortableChildren = true;
    this.level = level;
    this.root = this.createObject(new Sprite(rootTexture));

    this.container.addChild(this.root);
  }

  protected createObject(
    object: Sprite,
    { x, y }: { x?: number; y?: number } = { x: 0, y: 0 }
  ) {
    const dapp = object;
    dapp.zIndex = 2;
    dapp.anchor.set(0.5);
    dapp.setTransform(x, y);

    return dapp;
  }

  protected createLine(x: number, y: number) {
    const line = new Graphics();
    line.position.set(this.root.x, this.root.y);
    line.zIndex = 1;
    line.lineStyle(2, 0x000).lineTo(x, y);

    return line;
  }
}
class Network extends Base {
  nodes: Node[] = [];
  lines: Graphics[] = [];

  constructor({ level }: Omit<BaseConfig, "rootTexture">) {
    // TODO: Add more networks
    const rootTexture = GAME_TEXTURES.network[1];
    super({ level, rootTexture });
  }

  add(node: Node) {
    this.nodes.push(node);

    this.arrangeNodes();

    const line = this.createLine(node.container.x, node.container.y);
    this.lines.push(line);

    this.arrangeLines();

    this.container.addChild(node.container, line);
  }

  private arrangeNodes() {
    const radius = 200;
    const total = this.nodes.length;
    const angle = degToRad(360 / total);

    this.nodes.forEach((node, index) => {
      node.container.x = Math.sin(angle * index) * radius;
      node.container.y = Math.cos(angle * index) * radius;
      node.root.angle = -radToDeg(angle * index);
    });
  }

  private arrangeLines() {
    this.lines.forEach((line, index) => {
      const nextNode = this.nodes[index + 1] ?? this.nodes[0];

      if (nextNode) {
        const node = this.nodes[index];
        line
          .clear()
          .lineStyle(2, 0x000)
          .moveTo(node.container.x, node.container.y)
          .bezierCurveTo(
            this.root.x,
            this.root.y,
            this.root.x,
            this.root.y,
            nextNode.container.x,
            nextNode.container.y
          );
      }
    });
  }
}

class Node extends Base {
  dApp1?: Sprite;
  line1?: Graphics;

  dApp2?: Sprite;
  line2?: Graphics;

  dApp3?: Sprite;
  line3?: Graphics;

  constructor({ level }: Omit<BaseConfig, "rootTexture">) {
    const rootTexture = GAME_TEXTURES.node[level];
    super({ level, rootTexture });
  }

  add(app: Sprite) {
    this.dApp1 = this.createObject(app, { x: -100 });
    this.line1 = this.createLine(this.dApp1.x, this.dApp1.y);

    this.container.addChild(this.dApp1, this.line1);
  }
}
