export default class TurnKeeper {
  constructor() {
    this.div = document.getElementById("dice");
    this.turnCont = document.getElementById("turn");
  }

  update(player) {
    this.turnCont.innerHTML = player.name + "'s turn";
    this.div.style.backgroundColor = player.color;
  }
}
