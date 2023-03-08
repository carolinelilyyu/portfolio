$(document).ready(function () {
    // creates a new game with gameOver set to false, turn being x
    var game = new Game(); 
    // initializes index of turns
    var turnsLeft = 9;
    //makes empty array
    var arr =new Array(3)
    for (i=0; i <3; i++){
        arr[i]=new Array(3)
    }

    // creates the grid 
    var table = document.getElementsByTagName('table');
    var tableContent = table[0];

    for (var i = 0; i < 3; i++) {
        var trRow = document.createElement('tr');
        trRow.className = "row";
        for (var j = 0; j < 3; j++) {
            // each square
            var square = new Square();
            cell = square.createElement();
            // cell.on('click', function() {
            cell.addEventListener("click", function(){
                turnsLeft = square.setMark($(this), game, turnsLeft)
                game.switchTurn();
                // Prevents the player from learning the true winner
                // Checks to see if anyone won
                var won = game.checkWin(arr);
                game.announceWinner(won, turnsLeft)
            });
            trRow.appendChild(cell);
        }                
        tableContent.appendChild(trRow);
    }
    document.body.appendChild(tableContent);
});



class Square {
    constructor(mark){
        // could be x, o or empty
        this.mark = mark;
    }

    createElement(){
        var cell = document.createElement('td');
        cell.className = "cell";
        cell.dataPoints = "0";
        return cell;
    }
    
    getMark(){
        return this.value;
    }

    setMark(obj, game, turnsLeft){
        // on click, make the square into a circle or cross
        if(this.isEmpty(obj)){
            alert('Please select another square. That one has been full');
        }else{
            if(game.getTurn() == 'o'){
                obj.addClass('circle full').attr("data-points" , 1);
                turnsLeft--;
            }else{
                obj.addClass('cross full').attr("data-points" , -1);
                turnsLeft--;
            }
        }
        return turnsLeft;
    }

    isEmpty(obj){
        return (obj.hasClass('full'))
    }
}

class Game {
    constructor(){
        this.gameOver = false
        // could be x or o, let's default it to o
        this.turn = "o";
    }

    getGameOver(){
        return this.gameOver;
    }

    setGameOver(gameOver){
        this.gameOver = gameOver;
        return this.gameOver;
    }

    getTurn(){
        return this.turn;
    }

    switchTurn(){
        if(this.turn == 'x'){
            this.turn = 'o';
        }else{
            this.turn = 'x';
        }
        return this.turn;
    }

    announceWinner(won, turnsLeft){
        if (won === 1){
            this.setGameOver(true);
            alert("circle wins!");
            location.reload();
        }else if(won === 2){
            this.setGameOver(true);
            alert("cross wins!");
            location.reload();
        }
        // if the game isn't over and the squares are all full/turns have all been used 
        if(this.getGameOver() === false && turnsLeft === 0){
            alert('Game Over. Stalemate.')
            this.setGameOver(true);
            location.reload();
        }
    }
    
    checkWin(arr){
        // makes a 3x3 (2d array) grid updated data-points
        $("table tr").each(function(rowIndexofCell, valueofCell){
            $(this).find('td').each(function(columnIndexofCell, valueofCell2){
                arr[rowIndexofCell][columnIndexofCell] = parseInt($(this).attr('data-points'));
            });
        });

        // check for row wins
        for(var i = 0; i<3; i++){
            var rowSum = 0;
            for(var j = 0; j<3; j++){
                rowSum += arr[i][j]
            }
            // if there is a whole row full, one wins
            if(rowSum === 3){
                return 1;
            }else if(rowSum === -3){
                return 2;
            }
        }

        // check for column wins
        for(var i = 0; i<3; i++){
            var colSum = 0;
            for(var j = 0; j<3; j++){
                colSum += arr[j][i]
            }
            // if there is a whole column full, one wins
            if(colSum === 3){
                return 1;
            }else if(colSum === -3){
                return 2;
            }
        }


        // o c2 c3
        // c1 o c3
        // c1 c2 o
        if(arr[0][0] + arr[1][1] + arr[2][2] === 3){
            return 1;
        }else if(arr[0][0] + arr[1][1] + arr[2][2] === -3){
            return 2;
        }

        // c1 c2 o
        // c1 o c3
        // o c2 c3
        if(arr[2][0] + arr[1][1] + arr[0][2] === 3){
            return 1;
        }else if(arr[2][0] + arr[1][1] + arr[0][2] === -3){
            return 2;
        }
    }

}