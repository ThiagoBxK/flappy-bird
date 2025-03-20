import Game from "./Game.js";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const game = new Game(canvas);

game.render();
game.start();
