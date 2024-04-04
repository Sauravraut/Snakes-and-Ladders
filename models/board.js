export default class Board {
  constructor(view) {
    this.size = window.innerHeight;
    this.view = view;
    this.tileSize = this.size / 10;
    this.snakes_H = [98, 71, 60, 21, 15]; //snakes location
    this.snakes_T = [8, 53, 42, 0, 8]; //snakes location
    this.ladders_S = [10, 62, 50, 13, 70]; //ladders location
    this.ladders_E = [31, 80, 69, 54, 90];
    this.draw();
    // this.generate();
  }
  generate() {
    // todo generate snakes and ladders
    // while(this.snakes_H <= 5){
    //     let proposed_head = Math.floor(Math.random() * 89) + 10;
    //     let proposed_tail = proposed_head - 10 - 10 * Math.floor(Math.random() * 4);
    // }
  }
  draw(ctx = this.view) {
    for (let row = 9; row >= 0; row--) {
      //loop through all rows
      for (let col = 0; col < 10; col++) {
        // loop though all cols

        let x = col * this.tileSize; // x position
        let y = row * this.tileSize; // y position

        let tile_number = (99 - row * 10 - col).toString();

        if (row % 2 != 0) {
          // even tile flip direction
          tile_number = ((9 - row) * 10 + col).toString();
        }

        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
        ctx.fillText(
          tile_number,
          x + this.tileSize / 2,
          y + this.tileSize / 2 + this.tileSize * 0.1
        );
      }
    }

    for (let i = 0; i < this.snakes_H.length; i++) {
      //snake head (x,y)
      let y = 9 - Math.floor(this.snakes_H[i] / 10) + 0.75;
      let x = (this.snakes_H[i] % 10) + 0.5;

      if (Math.floor(this.snakes_H[i] / 10) % 2) {
        // even tile flip direction
        x = 9 - x + 1;
      }
      //snake tail(x,y)
      let final_y = 9 - Math.floor(this.snakes_T[i] / 10) + 0.25;
      let final_x = (this.snakes_T[i] % 10) + 0.5;
      if (Math.floor(this.snakes_T[i] / 10) % 2) {
        // even tile flip direction
        final_x = 9 - final_x + 1;
      }
      //draw line from head to tail
      ctx.lineWidth = 5;
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(x * this.tileSize, y * this.tileSize);
      ctx.lineTo(final_x * this.tileSize, final_y * this.tileSize);
      ctx.stroke();
    }
    for (let i = 0; i < this.ladders_S.length; i++) {
      //snake head (x,y)
      let y = 9 - Math.floor(this.ladders_S[i] / 10) + 0.25;
      let x = (this.ladders_S[i] % 10) + 0.5;

      if (Math.floor(this.ladders_S[i] / 10) % 2) {
        // even tile flip direction
        x = 9 - x + 1;
      }
      //snake tail(x,y)
      let final_y = 9 - Math.floor(this.ladders_E[i] / 10) + 0.75;
      let final_x = (this.ladders_E[i] % 10) + 0.5;
      if (Math.floor(this.ladders_E[i] / 10) % 2) {
        // even tile flip direction
        final_x = 9 - final_x + 1;
      }
      //draw line from head to tail
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(x * this.tileSize, y * this.tileSize);
      ctx.lineTo(final_x * this.tileSize, final_y * this.tileSize);
      ctx.stroke();
    }
  }
}
