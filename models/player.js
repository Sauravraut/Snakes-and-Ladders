import { drawCircle } from "../canvas.js";
export default class Player {
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
  get player_x() {
    const col = this.pos % 10;
    const row = 9 - Math.floor(this.pos / 10);

    // if even tile
    if (row % 2 == 0) {
      // then flip direction
      return (9 - col + this.visualOffset) * this.size;
    }

    return (col + this.visualOffset) * this.size;
  }
  get player_y() {
    let row = 9 - Math.floor(this.pos / 10);
    return (row + this.visualOffset) * this.size;
  }
  drawPlayer(ctx) {
    drawCircle(
      ctx,
      this.player_x,
      this.player_y,
      this.size * this.sizeMagnifier,
      this.color
    );
  }
  rollDice() {
    const result =
      Math.floor(Math.random() * (this.diceMax - 1)) + this.diceMin;
    this.pos += result;

    this.history.roll.push(result);
    this.history.pos.push(this.pos);
  }
  updateScore() {
    this.scoreDiv.innerText = this.pos;
  }
  resetHighlight() {
    this.scoreRow.style.backgroundColor = "white";
    this.scoreRow.style.color = this.color;
  }
  highlightScore() {
    this.scoreRow.style.backgroundColor = this.color;
    this.scoreRow.style.color = "white";
  }
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
