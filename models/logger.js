/**
 * Logs events in the game
 */
export default class Logger {
  constructor() {
    this.div = document.getElementById("log");
  }
  /**
   * logs current player's start and end
   * @param {Player} player current player
   * @param {number} start start position of player before action
   */
  onPlayerMove(player, start) {
    this.createNew(
      player.color,
      player.name +
        " rolled " +
        (player.pos - start) +
        ". " +
        player.name +
        " moves from " +
        start +
        " to " +
        player.pos +
        "."
    );
  }
  /**
   * when eaten by a snake, logs current player's start and end
   * @param {Player} player current player
   * @param {number} start start position of player before action
   */
  onSnakeEat(player, start) {
    this.createNew(
      player.color,
      "🐍 ( " +
        (player.pos - start) +
        " ) " +
        player.name +
        " was eaten by a snake. " +
        player.name +
        " moves from " +
        start +
        " to " +
        player.pos +
        "."
    );
  }
  /**
   * when a ladder is climbed, logs current player's start and end
   * @param {Player} player current player
   * @param {number} start start position of player before action
   */
  onLadderClimb(player, start) {
    this.createNew(
      player.color,
      "🪜 ( +" +
        (player.pos - start) +
        " ) " +
        player.name +
        " found a ladder.  " +
        player.name +
        " moves from " +
        start +
        " to " +
        player.pos +
        "."
    );
  }
  /**
   * creates a new log entry
   * @param {string} color color of text
   * @param {string} text text log
   */
  createNew(color, text) {
    const p = document.createElement("p");
    p.style.color = color;
    p.innerHTML = text;
    this.div.appendChild(p);
  }
}
