$(document).ready(function () {
    //makes empty array
    var arr =new Array(3)
        for (i=0; i <3; i++)
            arr[i]=new Array(3)
    
    var turn = 1
    $('td').on('click', function() {
        if($(this).hasClass('filled')){
            alert('Please select another square. That one has been filled');
        }else{
            if(turn === 1){
                $(this).addClass('circle filled').attr("data-points" , 1);
                turn = 2;
            }else{
                $(this).addClass('cross filled').attr("data-points" , 1);
                turn = 1;
            }
        }
        if(checkWin(arr) === 1){
            alert('circle wins!');
        }
        else if(checkWin(arr) === 2){
            alert('cross wins!');
        }
    });
    
});

function checkWin(arr){
    // makes a 3x3 (2d array) grid of zeros 
    $("table tr").each(function(i, val){
        $(this).find('td').each(function(j, val2){
            console.log(j, val2)
            arr[i][j] = parseInt($(this).attr('data-points'));
        });
    });

    // check for row wins
    for(var i = 0; i<3; i++){
        let rowSum = 0;
        for(var j = 0; j<3; j++){
            rowSum += arr[i][j]
        }
        //increment for each row if it's filled
        if(rowSum == 3){
            console.log("cicle wins!")
            return 1;
        }else if(rowSum == -3){
            console.log("cross wins!")
            return 2;
        }
    }
    // check for column wins
    for(var i = 0; i<3; i++){
        let rowSum = 0;
        for(var j = 0; j<3; j++){
            rowSum += arr[i][j]
        }
        //increment for each row if it's filled
        if(rowSum == 3){
            console.log("cicle wins!")
            return 1;
        }else if(rowSum == -3){
            console.log("cross wins!")
            return 2;
        }
    }

    // o c2 c3
    // c1 o c3
    // c1 c2 o
    if(arr[0][0] + arr[1][1] + arr[2][2] == 3){
        console.log("circle wins!")
        return 1;
    }else if(arr[0][0] + arr[1][1] + arr[2][2] == -3){
        console.log("cross wins!")
        return 2;
    }

    // c1 c2 o
    // c1 o c3
    // o c2 c3
    if(arr[2][0] + arr[1][1] + arr[0][2] == 3){
        console.log("circle wins!")
        return 1;
    }else if(arr[2][0] + arr[1][1] + arr[0][2] == -3){
        console.log("cross wins!")
        return 2;
    }
    
}