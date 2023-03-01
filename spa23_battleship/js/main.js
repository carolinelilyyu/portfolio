$(document).ready(function () {
        window.onload = function() {
            var turns = 20;
            var shipSizes = [];
            buildBoard();
            var json = makeJson();
            // changes shipSizes 
            var ships = getShipCoords(json, shipSizes);
            placeShips(turns, ships, shipSizes);
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

function getShipCoords(json, shipSizes){
    // gathers the coordinates that have ships on them
    shipCoords = [];
    // read the json
    for (let i in json) {
        var obj = json[i];
        for (var key in obj){
            var value = obj[key];
            var [row, column] = value["coords"]
            shipSizes.push([value["name"], value["size"]]);
             // whether the ship is vertical or horizontal, gather the coordinates of the ship according its own size and orientation
            if(value["orientation"] == "vertical"){
                shipCoords.push((Array(value["size"]).fill().map((_, index)=>[index+row, column, value["name"]])));
            }
            else if(value["orientation"] == "horizontal"){
                shipCoords.push((Array(value["size"]).fill().map((_, index)=>[row, column+index, value["name"]])));
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

function placeShips(turns, ship, shipSizes){
    // make a click listener for each box
    document.querySelectorAll(".square").forEach(
        function(item){
            item.addEventListener("click", function(){
                if(turns <= 0){
                    alert("GAME OVER");
                }
                if($(this).hasClass("full")){
                    alert("Can't click this square again.")
                }else{
                    // get the clicked square's coordinates
                    var [clickRow, clickColumn] = [parseInt(item.getAttribute("id")), parseInt(item.getAttribute("name"))]
                    // compare the own coordinates to any of the coordinates with a ship on it. If true, it's a hit. If false, it's a miss
                    for (i in ship){
                        // each ship has details
                        var shipDetails = ship[i]
                        // each ship gives the coords for first and second elements
                        var shipCoords = shipDetails.slice(0, 2);
                        // the third element is the name of the ship
                        var shipName = shipDetails[2];
                        if(shipCoords.toString() == [clickRow, clickColumn].toString()){
                            for(i in shipSizes){
                                // if the ship belongs in the shipSizes array
                                if(shipSizes[i].indexOf(shipName)>=0){
                                    // subtract one from the size because it's been visited
                                    shipSizes[i][1] -= 1;
                                    if(shipSizes[i][1] <= 0){
                                        // indicates to user it blew up
                                        alert("BLEW UP THIS SHIP");
                                    }
                                }
                            }
                            // not returning, different ships might have the same coordinate so we'll need to keep iterating until all ships with
                            // that clicked coordinate have their shipSize subtracted from.
                            $(this).addClass('red full');
                            turns--;
                        }
                    }
                    // 
                    if($(this).hasClass("red") != true){
                        turns--;
                        $(this).addClass('grey full');
                    }
                }
            });
        }
    )
}