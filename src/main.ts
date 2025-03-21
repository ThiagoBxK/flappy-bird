import Game from "./Game.js";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const game = new Game(canvas);

game.render();
game.startGame();

// TEMPORARY //
document
  .getElementById("dev-run")
  ?.addEventListener("click", () => game.startGame());

document
  .getElementById("dev-stop")
  ?.addEventListener("click", () => game.endGame());
