export type Position = {
  posX: number;
  posY: number;
};

export type Size = {
  height: number;
  width: number;
};

export type SpriteElement = {
  image: Promise<HTMLImageElement>;
  position: Position;
  size: Size;
};

export type GameState = {
  fps: number;
  frames: number;
  speed: number;
  interval: number | undefined;
};
