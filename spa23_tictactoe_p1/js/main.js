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
});
