$(document).ready(function () {
    const NUMBER_OF_GUESSES = 6
    var wordle = new Wordle('apple', NUMBER_OF_GUESSES)
    wordle.initBoard();
    wordle.listenForKeyboard();
    wordle.keyboardEvent();
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
        this.displayColor = ['b', 'b', 'b', 'b', 'b']
    }

    listenForKeyboard(){
        var board = document.getElementById("keyboard")

        board.addEventListener("click", (e)=>{
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

    keyboardEvent(){
        // we are adding an event with key set to the letter that was from listenForKeyboard()
        document.addEventListener("keyup", (e)=>{
            if (this.guessesRemaining === 0) {
                return
            }

            let key = e.key
            if(key == 'Backspace'){
                this.deleteLetter()
            }
            else if(key == 'Enter'){
                if(this.nextLetter < 4){
                    alert("Add more letters to your guess!")
                }
                else{
                    console.log("lets guess")
                    // console.log(this.guessArray)
                    this.guess(this.guessArray)
                }
            }
            else{
                this.insertLetter(key)
            }
        })
    }

    deleteLetter(){
        let row = document.getElementsByClassName("row")[6 - this.guessesRemaining]
        let cell = row.children[this.nextLetter - 1]
        cell.innerHTML = "";
        cell.classList.remove('filled')
        this.guessArray.pop()
        this.nextLetter -= 1

        // console.log(this.guessArray)
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

        // console.log(this.guessArray)
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
        // green check
        guessArray.forEach(function(guessElement, guessIndex){
            var answerIndex = answerArray.indexOf(guessElement)
            console.log(answerIndex)
            if(answerIndex === guessIndex){
                answerArray[answerIndex] = null
                guessArray[guessIndex] = null
                displayColor[answerIndex] = 'g'
            }
            else{
                displayColor[guessIndex] = 'b'
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
            }
        })

        console.log(displayColor)
    }

}
