import Board from "./board.js";
import Player from "./player.js";
import Logger from "./logger.js";
import { clearView } from "../canvas.js";
import TurnKeeper from "./turnKeeper.js";

export default class GameManager {
  constructor(boardView, playerView, players) {
    this.playerView = playerView;
    this.running = true;

    this.logger = new Logger();
    this.turnKeeper = new TurnKeeper();
    this.board = new Board(boardView);

    this.players = players.map(
      (player) => new Player(player.name, player.color, this.board.tileSize)
    );
    this.currentPlayerIndex = 0;
  }
  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
  nextPlayer() {
    this.currentPlayerIndex++;
    this.currentPlayerIndex = this.currentPlayerIndex % this.players.length;
    this.turnKeeper.update(this.currentPlayer);
    this.currentPlayer.highlightScore();
    this.updatePlayerView();
  }
  diceRoll() {
    if (!this.running) {
      return;
    }
    let start = this.currentPlayer.pos;
    this.currentPlayer.rollDice();
    this.logger.onPlayerMove(this.currentPlayer, start);
    this.performChecks();
    this.currentPlayer.updateScore();
    if (!this.running) {
      return;
    }
    this.currentPlayer.resetHighlight();
    this.nextPlayer();
  }
  updatePlayerView() {
    clearView(this.playerView);
    this.players.forEach((player) => player.drawPlayer(this.playerView));
    this.currentPlayer.drawPlayer(this.playerView);
  }
  performChecks() {
    this.checkSnake();
    this.checkLadder();
    this.checkGameWin();
  }
  checkSnake() {
    let start = this.currentPlayer.pos;
    if (this.board.snakes_H.includes(start)) {
      // TODO update to use set map
      const index = this.board.snakes_H.indexOf(start);
      this.currentPlayer.pos = this.board.snakes_T[index];
      this.currentPlayer.history.pos.push(this.currentPlayer.pos);
      this.logger.onSnakeEat(this.currentPlayer, start);
    }
  }
  checkLadder() {
    let start = this.currentPlayer.pos;
    if (this.board.ladders_S.includes(start)) {
      // TODO update to use set map
      const index = this.board.ladders_S.indexOf(start);
      this.currentPlayer.pos = this.board.ladders_E[index];
      this.currentPlayer.history.pos.push(this.currentPlayer.pos);
      this.logger.onLadderClimb(this.currentPlayer, start);
    }
  }
  checkGameWin() {
    if (this.currentPlayer.pos >= 100) {
      this.currentPlayer.pos = 100;
      this.logger.onGameWin(this.currentPlayer);
      console.log(this.currentPlayer.history);
      this.running = false;
    }
  }
  newGame() {
    location.reload();
    return false;
  }
}
