import Bird from "./Bird";
import Background from "./layers/Background";
import Ground from "./layers/Ground";

export type Position = {
  posX: number;
  posY: number;
};

export type Size = {
  height: number;
  width: number;
};

export type Physics = {
  speed: number;
  gravity: number;
};

export type SpriteElement = {
  image: Promise<HTMLImageElement>;
  position: Position;
  size: Size;
};

export type GravitySimulation = {
  applyGravity: () => void;
  speed: number;
  gravity: number;
};

export type DynamicLayerState = {
  speed: number;
  maxSpeed: number;
  size: Size;
  assets: {
    spritePath: string;
  };
};

export enum GameStatus {
  Menu,
  Playing,
  Lose,
}

export type GameState = {
  interval: number | undefined;
  status: GameStatus;
  fps: number;
  layerSpeed: number;
  maxLayerSpeed: number;
  physics: {
    speed: number;
    gravity: number;
  };
};

export type GameElements = {
  background: Background;
  ground: Ground;
  bird: Bird;
};
