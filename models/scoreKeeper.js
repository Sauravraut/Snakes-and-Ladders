export default class ScoreKeeper {
  constructor(players) {
    this.div = document.getElementById("scoreTable");
    players.forEach((player) => {
      this.createScoreBox(player);
    });
  }
  createScoreBox(playerName) {
    const nameCont = document.createElement("td");
    nameCont.innerText = playerName;

    const posCont = document.createElement("td");
    posCont.innerText = 0;

    const row = document.createElement("tr");
    row.appendChild(nameCont);
    row.appendChild(posCont);
    this.div.appendChild(row);
  }
}
