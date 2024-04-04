import Board from "./board.js";
import Player from "./player.js";
import Logger from "./logger.js";
import { clearView } from "./canvas.js";
import TurnKeeper from "./turnKeeper.js";
/**
 * Manages Game on large scale
 */
export default class GameManager {
  /**
   * @param {HTMLCanvasElement} boardView canvas for the board
   * @param {HTMLCanvasElement} playerView canvas for the players
   * @param {Object[]} players array of players
   */
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
  /**
   * Returns the current player
   */
  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
  /**
   * Increases the currentPlayerIndex by 1;
   */
  nextPlayer() {
    this.currentPlayerIndex++;
    this.currentPlayerIndex = this.currentPlayerIndex % this.players.length;
    if (this.currentPlayerIndex === 0) {
      this.logger.createNew("white", "");
    }
  }
  /**
   * Handles events when a dice is rolled
   */
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
    this.turnKeeper.update(this.currentPlayer);
    this.currentPlayer.highlightScore();
    this.updatePlayerView();
  }
  /**
   * Updates player view
   */
  updatePlayerView() {
    clearView(this.playerView);
    this.players.forEach((player) => player.drawPlayer(this.playerView));
    this.currentPlayer.drawPlayer(this.playerView);
  }
  /**
   * Prefroms checks to see if a event should occour
   */
  performChecks() {
    this.checkSnake();
    this.checkLadder();
    this.checkGameWin();
  }
  /**
   * Checks if current player is on top of snake head
   */
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
  /**
   * Checks if the current player is on top of ladder start
   */
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
  /**
   * Checks if the current player has won the game
   */
  checkGameWin() {
    if (this.currentPlayer.pos >= 100) {
      this.currentPlayer.pos = 100;
      this.onGameWin(this.currentPlayer);
      console.log(this.currentPlayer.history);
      this.running = false;
    }
  }
  /**
   * Resets the game
   */
  newGame() {
    location.reload();
    return false;
  }
  /**
   * shows a popup when a player wins the game
   */
  onGameWin(player) {
    const p = document.createElement("p");
    p.innerHTML += player.name + " Victory! ";
    document.getElementById("gameEndCont").style.display = "flex";
    document.getElementById("game_end").style.backgroundColor = player.color;
    document.getElementById("game_end").append(p);
  }
}
