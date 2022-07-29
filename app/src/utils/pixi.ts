import * as PIXI from 'pixi.js';
import { RefObject } from 'react';

import Network1 from '../assets/game/Network1.svg'

import Node1 from '../assets/game/Node1.svg'
import Node2 from '../assets/game/Node2.svg'
import Node3 from '../assets/game/Node3.svg'

import DApp11 from '../assets/game/DApp1-1.svg'
import DApp12 from '../assets/game/DApp1-2.svg'
import DApp13 from '../assets/game/DApp1-3.svg'

import DApp21 from '../assets/game/DApp2-1.svg'
import DApp22 from '../assets/game/DApp2-2.svg'
import DApp23 from '../assets/game/DApp2-3.svg'

import DApp31 from '../assets/game/DApp3-1.svg'
import DApp32 from '../assets/game/DApp3-2.svg'
import DApp33 from '../assets/game/DApp3-3.svg'

import Bridge1 from '../assets/game/Bridge1.svg'
import Bridge2 from '../assets/game/Bridge2.svg'
import Bridge3 from '../assets/game/Bridge3.svg'

interface Textures {
  network: {
    1: PIXI.Texture
  }
  node: {
    1: PIXI.Texture
    2: PIXI.Texture
    3: PIXI.Texture
  }
  dApp: {
    dex: {
      1: PIXI.Texture
      2: PIXI.Texture
      3: PIXI.Texture
    }
    staking: {
      1: PIXI.Texture
      2: PIXI.Texture
      3: PIXI.Texture
    }
    dao: {
      1: PIXI.Texture
      2: PIXI.Texture
      3: PIXI.Texture
    }
  }
  bridge: {
    1: PIXI.Texture
    2: PIXI.Texture
    3: PIXI.Texture
  }
}

interface ObjectConfig {
  x: number
  y: number
  width: number
  height: number
}

enum GameObject {
  Network,
  Node,
  Dex,
  Staking,
  Dao,
  Bridge
}
type Level = 1 | 2 | 3

const APP: PIXI.Application = new PIXI.Application({
  backgroundColor: 0xffffff,
  resizeTo: window,
});;

export const setup = (ref: RefObject<HTMLDivElement>) => {
  if (!ref.current) return;

  ref.current.appendChild(APP.view);

  const textures = loadTextures();

  const network = setupObject(createSprite(GameObject.Network, 1, textures), {
    x: APP.renderer.width / 2,
    y: APP.renderer.height / 2,
    width: 200,
    height: 200
  })
  const node1 = setupObject(createSprite(GameObject.Node, 1, textures), {
    x: APP.renderer.width / 2 - 150,
    y: APP.renderer.height / 2,
    width: 50,
    height: 50
  })
  const node2 = setupObject(createSprite(GameObject.Node, 2, textures), {
    x: APP.renderer.width / 2 + 150,
    y: APP.renderer.height / 2,
    width: 50,
    height: 50
  })

  // Add the node to the scene we are building
  APP.stage.addChild(network);

  APP.stage.addChild(node1);
  APP.stage.addChild(node2);

  // // Listen for frame updates
  // APP.ticker.add(() => {
  //       // each frame we spin the node around a bit
  //     node.rotation += 0.01;
  // });
}

const loadTextures = (): Textures => {
  return {
    network: {
      1: PIXI.Texture.from(Network1),
    },
    node: {
      1: PIXI.Texture.from(Node1),
      2: PIXI.Texture.from(Node2),
      3: PIXI.Texture.from(Node3),
    },
    dApp: {
      dex: {
        1: PIXI.Texture.from(DApp11),
        2: PIXI.Texture.from(DApp12),
        3: PIXI.Texture.from(DApp13),
      },
      staking: {
        1: PIXI.Texture.from(DApp21),
        2: PIXI.Texture.from(DApp22),
        3: PIXI.Texture.from(DApp23),
      },
      dao: {
        1: PIXI.Texture.from(DApp31),
        2: PIXI.Texture.from(DApp32),
        3: PIXI.Texture.from(DApp33),
      }
    },
    bridge: {
      1: PIXI.Texture.from(Bridge1),
      2: PIXI.Texture.from(Bridge2),
      3: PIXI.Texture.from(Bridge3),
    }
  } 
}

const createSprite = (gameObject: GameObject, level: Level, textures: Textures): PIXI.Sprite => {
  switch (gameObject) {
    case GameObject.Network:
      return new PIXI.Sprite(textures.network[1]);
    case GameObject.Bridge:
      return new PIXI.Sprite(textures.bridge[level]);
    case GameObject.Dao:
      return new PIXI.Sprite(textures.dApp.dao[level]);
    case GameObject.Dex:
      return new PIXI.Sprite(textures.dApp.dex[level]);
    case GameObject.Staking:
        return new PIXI.Sprite(textures.dApp.staking[level]);
    case GameObject.Node:
      return new PIXI.Sprite(textures.node[level]);
    default:
      throw new Error('Undefined object')
  }
}

const setupObject = (sprite: PIXI.Sprite, { x,y,width,height}: ObjectConfig) => {

  sprite.x = x;
  sprite.y = y;

  sprite.width = width;
  sprite.height = height;

  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;

  sprite.rotation = 0.785

  return sprite;
}