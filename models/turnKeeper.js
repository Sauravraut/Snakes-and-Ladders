/**
 * Holds Turn information and dice
 */
export default class TurnKeeper {
  constructor() {
    this.div = document.getElementById("dice");
    this.turnCont = document.getElementById("turn");
  }
  /**
   * Updates Text to show current players turn
   * @param {Player} player current player
   */
  update(player) {
    this.turnCont.innerHTML = player.name + "'s turn";
    this.div.style.backgroundColor = player.color;
  }
}
