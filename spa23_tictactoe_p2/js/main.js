$(document).ready(function () {
    // creates the grid 
    var table = document.getElementsByTagName('table');
    var tableContent = table[0];

    for (var i = 0; i < 3; i++) {
        var trRow = document.createElement('tr');
        trRow.className = "row";
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            cell.className = "cell";
            cell.dataPoints = "0";
            trRow.appendChild(cell);
        }                
        tableContent.appendChild(trRow);
    }
    document.body.appendChild(tableContent);
    
    ticTacToe();
});

function ticTacToe(){

    // initializes index of turns
    var index = 0;
    // determines if the game is over
    var gameIsOver = false;
    //makes empty array
    var arr =new Array(3)
    for (i=0; i <3; i++){
        arr[i]=new Array(3)
    }

    // 1 represents circle's turn
    // 2 represents cross' turn
    // on click, make the square into a circle or cross
    var turn = 1;
    $('td').on('click', function() {
        if($(this).hasClass('full')){
            alert('Please select another square. That one has been full');
        }else{
            if(turn === 1){
                $(this).addClass('circle full').attr("data-points" , 1);
                index++;
                turn = 2;
            }else{
                $(this).addClass('cross full').attr("data-points" , -1);
                index++;
                turn = 1;
            }
        }

        // Prevents the player from learning the true winner
        if(gameIsOver === true){
            alert('Stop! Game Over. Refresh to play again')
        }
        else{
            // Checks to see if anyone won
            var won = checkForWin(arr);
            if (won === 1){
                gameIsOver = true;
                alert("circle wins!");
            }else if(won === 2){
                gameIsOver = true;
                alert("cross wins!");
            }
            // if the game isn't over and the squares are all full/turns have all been used 
            if(gameIsOver === false && index === 9){
                alert('Game Over. Stalemate.')
                gameIsOver = true;
            }
        }
    });
}

function checkForWin(arr){
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

