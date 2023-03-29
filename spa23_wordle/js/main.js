$(document).ready(function () {
    const NUMBER_OF_GUESSES = 6
    var wordle = new Wordle('ikppp', NUMBER_OF_GUESSES)
    wordle.initBoard();
});



class Wordle{
    constructor(answer, NUMBER_OF_GUESSES){
        this.NUMBER_OF_GUESSES = NUMBER_OF_GUESSES
        this.guessesRemaining = NUMBER_OF_GUESSES;
        this.answer = answer;
        this.usedLetters = [];
        this.answerArray = answer.split("")
        this.displayColor = ['b', 'b', 'b', 'b', 'b']
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

    guess(guessWord){
        var guessArray = guessWord.split("")
        var answerArray = this.answerArray
        var displayColor = this.displayColor
        // green check
        guessArray.forEach(function(guessElement, guessIndex){
            var answerIndex = answerArray.indexOf(guessElement)
            if(answerIndex == guessIndex){
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
