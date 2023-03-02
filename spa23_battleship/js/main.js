$(document).ready(function () {
    document.getElementById("title").innerHTML = "Welcome to Battleship!"
    let name = prompt("Please enter name of your ship (Press cancel to use defaults): ", "BigShip");
    var json;
    if (name == null || name == "") {
        json = makeJson();
    } else {
        let orientation = prompt("Please enter the orientation like so:", "vertical");
        let size = prompt("Please enter the size of ship (choices are 2,3,4) like so:", 4);
        let row = prompt("Please enter the X coordinate of the row where the nose of the ship is (Max is 5):", 2);
        let column = prompt("Please enter the Y coordinate of the row where the nose of the ship is (Max is 5):", 3);
        json = {
            ships: [
                {
                    'name' : name,
                    'orientation': orientation,
                    'size': parseInt(size),
                    'coords': [parseInt(row), parseInt(column)]
                }
            ]
        }
        alert("We added the ship with these details: " + JSON.stringify(json));
    }
    window.onload = function() {
        var turns = 20;
        var shipSizes = [];
        buildBoard();
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

// You may attempt to create the JSON ship object on the fly (rather than loading it) once the 
// other functionality is completed (10 points extra credit for doing this successfully)
function makeCustomExtraCreditJson(){
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
                        console.log(ship)
                        // each ship has details
                        var shipDetails = ship[i]
                        // each ship gives the coords for first and second elements
                        var shipCoords = shipDetails.slice(0, 2);
                        // the third element is the name of the ship
                        var shipName = shipDetails[2];
                        if(shipCoords.toString() == [clickRow, clickColumn].toString()){
                            // get rid of that index up to one element because it's been visited
                            ship.splice(i, 1)
                            for(i in shipSizes){
                                // if the ship belongs in the shipSizes array
                                if(shipSizes[i].indexOf(shipName)>=0){
                                    // subtract one from the size because it's been visited
                                    shipSizes[i][1] -= 1;
                                    if(shipSizes[i][1] <= 0){
                                        // indicates to user it blew up
                                        alert("BLEW UP THIS SHIP: " + shipName);
                                    }
                                }
                            }
                            // not returning, different ships might have the same coordinate so we'll need to keep iterating until all ships with
                            // that clicked coordinate have their shipSize subtracted from.
                            $(this).addClass('red full');
                            turns--;
                            // console.log(ship)
                        }
                    }
                    // 
                    if($(this).hasClass("red") != true){
                        turns--;
                        $(this).addClass('grey full');
                    }
                }
                // the ships array is empty now. all ships have been sunk
                if(ship.length === 0){
                    alert("GAME OVER! YOU WIN!")
                    location.reload();
                }
            });
        }
    )
}