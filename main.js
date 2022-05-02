class GameManager{
    constructor(back, front, colors = ['Red', 'Green', 'Blue', 'Brown'], size = window.innerHeight){
        this.back = back;
        this.front = front; 
        this.running = true; //state

        this.board = new Board(size);
        this.board.draw(this.back);

        this.players = (colors).map(color => new Player(color, this.board.t_size));
        this.currentPlayer = 0;
    }
    next(){
        this.currentPlayer += 1;
        if(this.currentPlayer >= 4){
            this.currentPlayer = 0;
        }
    }
    diceRoll(){
        
        let start = (this.players[this.currentPlayer]).pos;
        let res = Math.floor(Math.random() * 5) + 1;

        (this.players[this.currentPlayer]).pos += res;

        let end = (this.players[this.currentPlayer]).pos;

        if(end >= 100){
            this.running = false;
        }
        return [start, end, res];
    }
    update(ctx = this.front){
        ctx.clearRect(0, 0, canvas2.width, canvas2.height);

        (this.players).map(player => player.draw(ctx));

        this.players[this.currentPlayer].draw(ctx);
    }
    getCurret(){
        return this.players[this.currentPlayer].color;
    }
    check(){
        let start = this.players[this.currentPlayer].pos;
        let i = this.board.snakes_H.indexOf(start);
        if(i >= 0){
            let end = this.board.snakes_T[i];
            this.players[this.currentPlayer].pos = end;
            return [start, end, 1]
        }

        i = this.board.ladders_S.indexOf(start);
        if(i >= 0){
            let end = this.board.ladders_E[i];
            this.players[this.currentPlayer].pos = end;

            return [start, end, 0]
        }
        return [-1, -1, -1];
    }
}
class Board{
    constructor(size){
        this.size = size;
        this.t_size = size/10;
        this.snakes_H = [98,71,60,21,15]; //snakes location
        this.snakes_T = [8,53,42,0,8]; //snakes location
        this.ladders_S = [10,62,50,13,70]; //ladders location
        this.ladders_E = [31,80,69,54,90];
        // this.generate();
    }
    generate(){
        // while(this.snakes_H <= 5){
        //     let proposed_head = Math.floor(Math.random() * 89) + 10;
        //     let proposed_tail = proposed_head - 10 - 10 * Math.floor(Math.random() * 4);
            
        // }
    }
    draw(ctx){
        for (let row = 9; row >= 0; row--){ //loop through all rows
            for (let col = 0; col < 10; col++){ // loop though all cols

                let x = col * this.t_size; // x position
                let y = row * this.t_size; // y position

                let tile_number = (99 - row * 10 - col).toString();

                if(row % 2 != 0){ // even tile flip direction
                    tile_number = ((9 - row) * 10 + col).toString();
                }

                ctx.strokeRect(x, y, this.t_size, this.t_size);
                ctx.fillText(tile_number, x + this.t_size / 2, y + this.t_size/ 2 + this.t_size * 0.10);
            }
        }

        for (let i = 0; i < this.snakes_H.length; i++){
            //snake head (x,y)
            let y = 9 - Math.floor(this.snakes_H[i] / 10) + 0.75;
            let x = (this.snakes_H[i] % 10) + 0.5;

            if(Math.floor(this.snakes_H[i] / 10) % 2){ // even tile flip direction
                x = 9 - x + 1;
            }
            //snake tail(x,y)
            let final_y = 9 - Math.floor(this.snakes_T[i] / 10) + 0.25;
            let final_x = this.snakes_T[i] % 10 + 0.5;
            if(Math.floor(this.snakes_T[i] / 10)% 2){ // even tile flip direction
                final_x = 9 - final_x + 1;
            }
            //draw line from head to tail
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(x * this.t_size,y * this.t_size);
            ctx.lineTo(final_x * this.t_size,final_y * this.t_size);
            ctx.stroke();
        }
        for (let i = 0; i < this.ladders_S.length; i++){
            //snake head (x,y)
            let y = 9 - Math.floor(this.ladders_S[i] / 10) + 0.25;
            let x = (this.ladders_S[i] % 10) + 0.5;

            if(Math.floor(this.ladders_S[i] / 10) % 2){ // even tile flip direction
                x = 9 - x + 1;
            }
            //snake tail(x,y)
            let final_y = 9 - Math.floor(this.ladders_E[i] / 10) + 0.75;
            let final_x = this.ladders_E[i] % 10 + 0.5;
            if(Math.floor(this.ladders_E[i] / 10)% 2){ // even tile flip direction
                final_x = 9 - final_x + 1;
            }
            //draw line from head to tail
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(x * this.t_size,y * this.t_size);
            ctx.lineTo(final_x * this.t_size,final_y * this.t_size);
            ctx.stroke();
        }
    }
}
class Player{
    constructor(color, size){
        this.color = color; // player's name
        this.pos = 0; //player's current location | start = 0
        this.mod = ""; // any modifier the play has
        this.size = size;
    }
    draw(ctx){
        let row = 9 - Math.floor(this.pos / 10);
        let col = this.pos % 10;

        let x = (col + 0.5) * this.size;
        let y = (row + 0.5) * this.size;

        if(row % 2 == 0){ // even tile flip direction
           x = (9 - col + 0.5) * this.size;
        }

        ctx.beginPath();
        ctx.arc(x , y, this.size * 0.35, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

GM = new GameManager(ctx,ctx2);
GM.update();


function roll(){
    if(!GM.running){
        return 
    }
    let player = GM.getCurret();
    let current = document.getElementById(player);
    let cont = document.getElementById(player + "_cont");

    cont.style.backgroundColor = "white";
    cont.style.color = GM.getCurret();

    let result = GM.diceRoll();

    let log = document.getElementById('log');
    let p = document.createElement('p');
    p.style.color = player;

    p.innerHTML =  player + " rolled " + result[2] + ". " + player + " moves from "+ result[0] + " to " + result[1] + ". <br>";
    current.innerHTML = result[1];

    if(!GM.running){
        let end_msg = document.createElement('p');
        end_msg.innerHTML = player + " won ";
        document.getElementById('Game_end').style.backgroundColor = player;
        document.getElementById('Game_end').append(end_msg);
    }
    result = GM.check();

    if(result[2] >= 0){
        if(result[2]){
            p.innerHTML +=  player + " was eaten by a snake . " + player + " moves from "+ result[0] + " to " + result[1] + ". <br>";
        }else{
            p.innerHTML +=  player + " found a ladder. " + player + " moves from "+ result[0] + " to " + result[1] + ".  <br>";
        }
        
    }

    log.appendChild(p);

   
    GM.next();
    GM.update();

    player = GM.getCurret();
    cont = document.getElementById(player + "_cont");

    document.getElementById('turn').innerHTML = player + "'s turn";
    document.getElementById('dice').style.backgroundColor = player;

    cont.style.backgroundColor = player;
    cont.style.color = "white";
}