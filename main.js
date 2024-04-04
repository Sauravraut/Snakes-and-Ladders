import GameManager from "./models/gameManager.js";
import { boardView, playerView } from "./canvas.js";

const diceRollBtn = document.getElementById("diceRollBtn");
const resetBtn = document.getElementById("resetBtn");
const players = ["Red", "Green", "Blue", "Brown"];

const GM = new GameManager(boardView, playerView, players);
GM.updatePlayerView();
GM.currentPlayer.highlightScore();
GM.turnKeeper.update(GM.currentPlayer);

function Roll() {
  if (!GM.running) {
    return;
  }

  GM.ondiceRoll();
}

diceRollBtn.addEventListener("click", Roll);
resetBtn.addEventListener("click", GM.newGame);
