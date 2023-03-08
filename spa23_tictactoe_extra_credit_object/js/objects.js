class Square {
    constructor(column, row, mark){
        // could be x, o or empty
        this.mark = mark;
        this.column = column;
        this.row = row
    }

    createElement(){
        var cell = document.createElement('td');
        cell.className = "cell";
        cell.dataPoints = "0";
        return cell;
    }
    
    showMark(){
        return this.value;
    }

    place(mark){
        this.value = mark;
    }

    isEmpty(){
        return this.value.length === 0;
    }
}

class Game {
    constructor(){
        this.gameOver = false
        // could be x or o, let's default it to x
        this.turn = "x";
    }

    newGame(turn){
        this.gameOver = true;
    }

    checkWin(){

    }

    switchTurn(){
        if(this.turn == 'x'){
            this.turn = 'o';
        }else{
            this.turn = 'x';
        }
        return this.turn;
    }

}