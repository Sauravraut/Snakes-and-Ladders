export default class Logger {
  constructor() {
    this.div = document.getElementById("log");
  }
  onPlayerMove(player, start) {
    const p = document.createElement("p");
    p.style.color = player.color;
    p.innerHTML =
      player.color +
      " rolled " +
      (player.pos - start) +
      ". " +
      player.color +
      " moves from " +
      start +
      " to " +
      player.pos +
      ". <br>";
    this.div.appendChild(p);
  }
  onSnakeEat(player, start) {
    const p = document.createElement("p");
    p.style.color = player.color;
    p.innerHTML +=
      player.color +
      " was eaten by a snake . " +
      player.color +
      " moves from " +
      start +
      " to " +
      player.pos +
      ". <br>";
    this.div.appendChild(p);
  }
  onLadderClimb(player, start) {
    const p = document.createElement("p");
    p.style.color = player.color;
    p.innerHTML +=
      player.color +
      " found a ladder. " +
      player.color +
      " moves from " +
      start +
      " to " +
      player.pos +
      ".  <br>";
    this.div.appendChild(p);
  }
  onGameWin(player) {
    const p = document.createElement("p");
    p.innerHTML += player.color + " Victory! ";
    document.getElementById("gameEndCont").style.display = "flex";
    document.getElementById("game_end").style.backgroundColor = player.color;
    document.getElementById("game_end").append(p);
  }
}
