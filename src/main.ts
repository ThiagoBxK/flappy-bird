// import Game from "./Game.js";

import Ground from "./Ground.js";
import Background from "./Background.js";
import ScoreboardUI from "./ScoreboardUI.js";
import Bird from "./Bird.js";
// const canvas = document.querySelector("canvas") as HTMLCanvasElement;
// const game = new Game(canvas);

// game.render();
// game.startGame();

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const ground = new Ground(canvas);
const background = new Background(canvas);
const scoreBoard = new ScoreboardUI(canvas);

const bird = new Bird(canvas);

// background.render();
// ground.render();

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  bird.updateFrame();
  // background.updateFrame();
  // ground.updateFrame();
  // scoreBoard.render();
}, 1000 / 60);
