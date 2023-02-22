$(document).ready(function () {
    menu = {
        "hotdog" : 4,
        "fries" : 3.5,
        "soda" : 1.5,
        "sauerkraut" : 1,
    }
    var cartPrices = {}
    var submit = document.getElementById("submit")
    submit.addEventListener("click", getSelected)

    function getSelected(){
        var quantityHotdogs = document.getElementById("hotdog").value
        cartPrices["hotdog"] = [menu.hotdog * quantityHotdogs,  parseInt(quantityHotdogs)];
    
        var quantityFries = document.getElementById("fries").value
        cartPrices["fries"] = [menu.fries * quantityFries, parseInt(quantityFries)];
    
        var quantitySoda = document.getElementById("soda").value
        cartPrices["soda"] = [menu.soda * quantitySoda, parseInt(quantitySoda)];
    
        var quantitySauerkraut = document.getElementById("sauerkraut").value
        cartPrices["sauerkraut"] = [menu.sauerkraut * quantitySauerkraut , parseInt(quantitySauerkraut)];
    
        findItem(menu, cartPrices)
    }
    
});


function findItem(menu, cartPrices){
    var cartStatement = "Your Cart Has: <br>";
    var totalPrice = 0;
    for(item in cartPrices){
        if(cartPrices[item][0] != 0){
            totalPrice += cartPrices[item][0]
            cartStatement += cartPrices[item][1] + "x " + item + " which is $" + cartPrices[item][0] + "<br>"; 
        }
    }
    if(totalPrice == 0){
        cartStatement = "Your Cart Has: <br>Nothing"
    }
    document.getElementById("cartPrice").innerHTML = "<i class='fas fa-cart-plus'></i><br>"+ cartStatement
    totalStatement = "<i class='fas fa-receipt'></i><br>"
    if(totalPrice > 20){
        totalPrice = totalPrice * 0.9;
        totalStatement += "Your 10% discounted total is: $" + totalPrice +  ".<br>Tax is 6.25%<br>Your total is: "
    }else{
        totalStatement += "Your total is: $" + totalPrice + ".<br>Tax is 6.25%<br>Your total is: " 
    }
    document.getElementById("discounttax").innerHTML = totalStatement
    document.getElementById("total").innerHTML = "$" + totalPrice * 1.0625 + "<br><input type='submit' value='Checkout' id='checkout'>"


    var checkout = document.getElementById("checkout")
    checkout.addEventListener("click",function() {
        alert("Thank you for purchasing!");
        location.reload();
    })
}