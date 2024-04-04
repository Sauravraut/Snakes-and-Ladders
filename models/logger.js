export default class Logger {
  constructor() {
    this.div = document.getElementById("log");
    this.color = "red";
  }
  onPlayerMove(player, start) {
    this.createNew(
      player.color,
      player.color +
        " rolled " +
        (player.pos - start) +
        ". " +
        player.color +
        " moves from " +
        start +
        " to " +
        player.pos +
        ". <br>"
    );
  }
  onSnakeEat(player, start) {
    this.createNew(
      player.color,
      player.color +
        " was eaten by a snake . " +
        player.color +
        " moves from " +
        start +
        " to " +
        player.pos +
        ". <br>"
    );
  }
  onLadderClimb(player, start) {
    this.createNew(
      player.color,
      player.color +
        " found a ladder. " +
        player.color +
        " moves from " +
        start +
        " to " +
        player.pos +
        ".  <br>"
    );
  }
  createNew(color, text) {
    const p = document.createElement("p");
    p.style.color = color;
    p.innerHTML = text;
    this.div.appendChild(p);
  }
  onGameWin(player) {
    const p = document.createElement("p");
    p.innerHTML += player.name + " Victory! ";
    document.getElementById("gameEndCont").style.display = "flex";
    document.getElementById("game_end").style.backgroundColor = player.color;
    document.getElementById("game_end").append(p);
  }
}
