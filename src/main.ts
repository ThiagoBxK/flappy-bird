// import Game from "./Game.js";

import Ground from "./Ground.js";
import Background from "./Background.js";
// const canvas = document.querySelector("canvas") as HTMLCanvasElement;
// const game = new Game(canvas);

// game.render();
// game.startGame();

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const ground = new Ground(canvas);
const background = new Background(canvas);

background.render();
ground.render();

setInterval(() => {
  background.updateFrame();
  ground.updateFrame();
}, 1000 / 60);
