$(document).ready(function () {
    const NUMBER_OF_GUESSES = 6
    var wordle = new Wordle('apple', NUMBER_OF_GUESSES)
    wordle.initBoard();
    wordle.listenForKeyboard();
    wordle.initDebugAnswer();
    document.addEventListener("keyup", (e)=>{
        // is guesses remaining goes over, game over
        if (wordle.guessesRemaining === 0) {
            toastr.error("Out of tries. Game Over")
            setTimeout(function(){window.location.reload();}, 2000);
            return
        }

        let key = e.key
        if(key == 'Backspace'){
            wordle.deleteLetter()
        }
        else if(key == 'Enter'){
            if(wordle.nextLetter < 5){
                toastr.error("Add more letters to your guess!")
            }
            else{
                // guessing the word because this row is filled
                var displayColorRow = wordle.guess(wordle.guessArray)
                var winningDisplayColor = ['g', 'g', 'g', 'g', 'g']
                wordle.colorCell(displayColorRow)
                wordle.guessesRemaining -= 1
                wordle.nextRow()
                if(JSON.stringify(displayColorRow) === JSON.stringify(winningDisplayColor)){
                    var peped = document.getElementById("peped")
                    peped.classList.remove("hidden")
                    toastr.success("YOU WIN! Restarting game...")
                    toastr.success("How many tries that took: " + (6 - wordle.guessesRemaining))
                    setTimeout(function(){window.location.reload();}, 5000);
                }
            }
        }
        else{
            // only allow alpha characters
            let letter = key.match(/[a-z]/gi)
            if (!letter || letter.length > 1) {
                return
            } else {
                wordle.insertLetter(key)
            }
        }
    })
});



class Wordle{
    constructor(answer, NUMBER_OF_GUESSES){
        this.NUMBER_OF_GUESSES = NUMBER_OF_GUESSES
        this.guessesRemaining = NUMBER_OF_GUESSES;
        this.answer = answer;
        this.nextLetter = 0;
        this.usedLetters = [];
        this.answerArray = answer.split("")
        this.guessArray = []
        this.displayColor =  ['b', 'b', 'b', 'b', 'b']
    }

    initDebugAnswer(){
        var debug = document.getElementById("debug")
        debug.addEventListener("click", (e)=>{
            debug.innerHTML = this.answer
        })
    }

    nextRow(){
        this.nextLetter = 0
        this.guessArray = []
        this.displayColor =  ['b', 'b', 'b', 'b', 'b']
        this.answerArray = this.answer.split("")
    }

    listenForKeyboard(){
        var keyboard = document.getElementById("keyboard")

        keyboard.addEventListener("click", (e)=>{
            var target = e.target
            if (!target.classList.contains("key")) {
                return
            }
            let letter = target.innerHTML
    
            if (letter === "del") {
                letter = "Backspace"
            } 
            else if (letter === 'enter'){
                letter = 'Enter'
            }
        
            document.dispatchEvent(new KeyboardEvent("keyup", {"key": letter}))
        })
    }

    deleteLetter(){
        let row = document.getElementsByClassName("row")[6 - this.guessesRemaining]
        let cell = row.children[this.nextLetter - 1]
        cell.innerHTML = "";
        cell.classList.remove('filled')
        this.guessArray.pop()
        this.nextLetter -= 1
    }

    insertLetter(key){
        if (this.nextLetter === 5) {
            return
        }
        var pressedKey = key.toLowerCase()
        let row = document.getElementsByClassName("row")[6 - this.guessesRemaining]
        let cell = row.children[this.nextLetter]
        cell.innerHTML = pressedKey
        cell.classList.add('filled')
        this.guessArray.push(pressedKey)
        this.nextLetter += 1
    }

    initBoard(){
        let board = document.getElementById("board")
    
        for(let i = 0; i< this.NUMBER_OF_GUESSES; i++){
            // create a row for each number of guesses
            let row = document.createElement("div")
            row.className = "row"
    
            for(let j = 0; j<5; j++){
                let cell = document.createElement("div")
                cell.className = "cell"
                row.appendChild(cell)
            }
            board.appendChild(row)
        }
    }

    // instead of splitting the word, give the whole array of letters
    guess(guessArray){
        var answerArray = this.answerArray
        var displayColor = this.displayColor
        var usedLetters = this.usedLetters
        // green check
        guessArray.forEach(function(guessElement, guessIndex){
            if(answerArray[guessIndex] === guessArray[guessIndex]){
                answerArray[guessIndex] = null
                guessArray[guessIndex] = null
                displayColor[guessIndex] = 'g'
            }
        });
        // yellow check
        guessArray.forEach(function(guessElement, guessIndex){
            if(guessArray[guessIndex] != null){
                var answerIndex = answerArray.indexOf(guessElement)
                if(answerIndex > -1){
                    answerArray[answerIndex] = null
                    guessArray[guessIndex] = null
                    displayColor[guessIndex] = 'y'
                }
                else{
                    if(!usedLetters.includes(guessElement)){
                        usedLetters.push(guessElement)
                    }
                    document.getElementById("used-letters").innerHTML = usedLetters.join(" ")
                }
            }
        })

        return displayColor
    }

    colorCell(displayColorRow){
        var guessesRemaining =  this.guessesRemaining
        let row = document.getElementsByClassName("row")[6 - guessesRemaining]
        displayColorRow.forEach(function(element, index){
            if(element === 'g'){
                row.children[index].classList.add('green')
            }else if(element === 'y'){
                row.children[index].classList.add('yellow')
            }else{
                row.children[index].classList.add('gray')
            }
        });
    }

}
