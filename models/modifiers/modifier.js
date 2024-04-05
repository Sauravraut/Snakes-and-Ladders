// rolls twice picks the highest number
class LuckyDice {
  constructor() {
    this.duration = 2;
  }
  affect(player) {
    player.pos += Math.max(player.rollDice(), player.rollDice());
    this.duration--;
  }
}

export { LuckyDice };
/*class mod {
  displayNotification(x) {
    console.log("You recieved " + x);
  }
}
// rolls twice picks the lowest number
const UnluckyDice = Math.min(this.rollDice(), this.rollDice());

// only rolls 6
class LegendaryDice extends mod {
  affect(player) {}
}
// only rolls 1
class LoneDice extends mod {
  affect(player) {}
}
// swap postions of first and last on the ladder
// skip the next players turn
// skip the next ladder
// skip the next snake
// snake eater - climbs the snake
// slippery slope - fall down the next ladder
// removes mods from all players
// squsihy - next event sends you to 0
// rock hard - destroy next event
// took a shower - remove all debuffs
// fat - move half speed
// Schordingers dice - 50 50 chance to move back or front
*/
