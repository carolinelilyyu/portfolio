$(document).ready(function () {
    var arr =new Array(3)
        for (i=0; i <3; i++)
            arr[i]=new Array(3)

    $("table tr").each(function(i, val){
        $(this).find('td').each(function(j, val2){
            console.log(j, val2)
            arr[i][j] = parseInt($(this).attr('data-points'));
        });
    });

    /// makes a 3x3 (2d array) grid of zeros 
            
    
});

    // in each row
    // if columns 1,2,3 are of one type
    // o  o  o
    // c1 c2 c3
    // c1 c2 c3

    // in each column
    // row 1,2,3 are of one type
    // o c2 c3
    // o c2 c3
    // o c2 c3

    // for all rows
    // columns 1,2,3 are of one type
    // o c2 c3
    // c1 o c3
    // c1 c2 o
