import GameManager from "./models/gameManager.js";
import { boardView, playerView } from "./models/canvas.js";

const diceRollBtn = document.getElementById("diceRollBtn");
const resetBtn = document.getElementById("resetBtn");
const players = [
  {
    name: "Player 1",
    color: "#FF0000",
  },
  {
    name: "Player 2",
    color: "Green",
  },
  {
    name: "Player 3",
    color: "Blue",
  },
  {
    name: "Player 4",
    color: "Brown",
  },
];

const GM = new GameManager(boardView, playerView, players);
GM.updatePlayerView();
GM.currentPlayer.highlightScore();
GM.turnKeeper.update(GM.currentPlayer);

diceRollBtn.addEventListener("click", () => GM.diceRoll());
resetBtn.addEventListener("click", GM.newGame);
