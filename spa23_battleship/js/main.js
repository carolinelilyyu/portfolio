$(document).ready(function () {
        window.onload = function() {
            var turns = 20;
            buildBoard();
            var json = makeJson();
            var shipCoords = getShipCoords(json);
            placeShips(turns, shipCoords);
        }
});

function makeJson(){
    // make the json
    return {
        ships: 
        [
            {
            'name': 'ship1',
            'orientation': 'vertical',
            'size': 4,
            'coords':[2,3]
            },	
            {
            'name':'ship2',
            'orientation': 'horizontal',
            'size': 3,
            'coords':[3,3]
            }
        ]
    }
}

function getShipCoords(json){
    // gathers the coordinates that have ships on them
    shipCoords = [];
    // read the json
    for (let i in json) {
        var obj = json[i];
        for (var key in obj){
            var value = obj[key];
            var [row, column] = value["coords"]
             // whether the ship is vertical or horizontal, gather the coordinates of the ship according its own size and orientation
            if(value["orientation"] == "vertical"){
                shipCoords.push((Array(value["size"]).fill().map((_, index)=>[index+row, column])));
            }
            else if(value["orientation"] == "horizontal"){
                shipCoords.push((Array(value["size"]).fill().map((_, index)=>[row, column+index])));
            }
        }
    }
    return shipCoords.flat();
}

function buildBoard(){
    // build the rows
    board = Array(6).fill().map((_, index)=>index);
    row = 0;
    // build the columns
    for(i = 0; i<6; i++){
        arrayIndex = Array(6).fill().map((_, index)=>index);
        // id is the row, name is the column
        divs = arrayIndex.map(i=>
            "<div class='square' id='" + row + "' name='" + i +  "'>&nbsp;</div>"
            );
        board[i] = divs
        row++;
    }
    // write the html for it
    battleshipBoard = document.getElementById("battleship-board").innerHTML = board.join('<br></br>');
}

function placeShips(turns, shipCoords){
    // make a click listener for each box
    document.querySelectorAll(".square").forEach(
        function(item){
            item.addEventListener("click", function(){
                // get the clicked square's coordinates
                var [clickRow, clickColumn] = [parseInt(item.getAttribute("id")), parseInt(item.getAttribute("name"))]
                // compare the own coordinates to any of the coordinates with a ship on it. If true, it's a hit. If false, it's a miss
                for (i in shipCoords){
                    if(shipCoords[i].toString() == [clickRow, clickColumn].toString()){
                        $(this).addClass('red');
                        turns--;
                        return true;
                    }
                }
                turns--;
                $(this).addClass('grey');
                return false;
            });
        }
    )
}