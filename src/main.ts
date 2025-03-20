import Bird from "./Bird.js";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const bird = new Bird(canvas);
bird.render();

bird.state.startGame();
