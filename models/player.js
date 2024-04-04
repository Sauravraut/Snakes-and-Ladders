import { drawCircle } from "./canvas.js";

/**
 * Holds player data and interactions
 */
export default class Player {
  /**
   *
   * @param {string} name Name of the player
   * @param {string} color Color of the token
   * @param {number} size size of the token
   */
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
    this.pos = 0;
    this.modifiers = [];
    this.diceMin = 1;
    this.diceMax = 6;
    this.visualOffset = 0.5;
    this.sizeMagnifier = 0.35;
    this.scoreDiv;
    this.scoreRow;
    this.history = {
      roll: [],
      pos: [this.pos],
    };
    this.createScoreBox();
  }
  /**
   * Returns the x coordinate of the player token on canvas
   */
  get player_x() {
    const col = this.pos % 10;
    const row = 9 - Math.floor(this.pos / 10);

    // If even tile
    if (row % 2 == 0) {
      // then flip direction
      return (9 - col + this.visualOffset) * this.size;
    }

    return (col + this.visualOffset) * this.size;
  }
  /**
   * Returns the y coordinate of the player token on canvas
   */
  get player_y() {
    let row = 9 - Math.floor(this.pos / 10);
    return (row + this.visualOffset) * this.size;
  }
  /**
   * Draws the player on canvas
   */
  drawPlayer(ctx) {
    drawCircle(
      ctx,
      this.player_x,
      this.player_y,
      this.size * this.sizeMagnifier,
      this.color
    );
  }
  /**
   * Rolls a random number between diceMax and diceMin inclusive. Also records all rolls and positions
   */
  rollDice() {
    const result =
      Math.floor(Math.random() * (this.diceMax - 1)) + this.diceMin;
    this.pos += result;

    this.history.roll.push(result);
    this.history.pos.push(this.pos);
  }
  /**
   * Updates the score of the player on the scoreboard
   */
  updateScore() {
    this.scoreDiv.innerText = this.pos;
  }
  /**
   * Resets the highlight on the scoreboard
   */
  resetHighlight() {
    this.scoreRow.style.backgroundColor = "white";
    this.scoreRow.style.color = this.color;
  }
  /**
   * Highlights players score on the scoreboard
   */
  highlightScore() {
    this.scoreRow.style.backgroundColor = this.color;
    this.scoreRow.style.color = "white";
  }
  /**
   * Creates a new entry on the scoreboard for the player
   */
  createScoreBox() {
    const table = document.getElementById("scoreTable");
    const nameCont = document.createElement("td");
    nameCont.innerText = this.name;

    this.scoreDiv = document.createElement("td");
    this.scoreDiv.innerText = this.pos;

    this.scoreRow = document.createElement("tr");

    this.scoreRow.style.color = this.color;
    this.scoreRow.appendChild(nameCont);
    this.scoreRow.appendChild(this.scoreDiv);
    table.appendChild(this.scoreRow);
  }
}
