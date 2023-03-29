$(document).ready(function () {
    var wordle = new Wordle('guana')
    wordle.guess('guana')
    console.log(wordle.answerMap)
});

class Wordle{
    constructor(answer){
        this.answer = answer;
        this.usedLetters = [];
        this.answerMap = makeMap(answer)
        this.displayColor = ['b', 'b', 'b', 'b', 'b']
    }
    // for each guess, we will compare to the answer
    guess(guessedWord){
        var guessedWordMap = makeMap(guessedWord)
        var answerMap = this.answerMap
        var displayColor = this.displayColor
        guessedWordMap.forEach(function(element, index){
            if(answerMap.has(index)){
                var answerLetterArray = answerMap.get(index)
                var guessedLetterArray = guessedWordMap.get(index)
                console.log(answerLetterArray)
                answerLetterArray.forEach(function(currentValue, currentIndex){
                    if(guessedLetterArray.includes(currentValue)){
                        console.log("test")
                        displayColor[answerLetterArray] = 'g'
                        var index = guessedLetterArray.indexOf(currentValue)
                        guessedLetterArray[index] = null
                    }
                    console.log(displayColor)
                })

                // if(guessedWordPosition.includes(answerPosition)){
                //     console.log("test")

                //     displayColor[answerPosition] = 'g'
                //     var index = guessedWordPosition.indexOf(answerPosition)
                //     guessedWordPosition[index] = null
                //     console.log(guessedWordPosition)
                // }else{
                //     if(answerPosition == guessedWordPosition){
                //         displayColor[index] = 'g'
                //     }
                // }
            }
        })
    }

}


function makeMap(word){
    wordMap = new Map()
    var wordArray = word.split('')
    for (var i = 0; i < word.length; i++) {
        if(this.wordMap.has(wordArray[i])){
            var arr = [i]
            arr = arr.concat(this.wordMap.get(wordArray[i]))
            // arr.push(this.wordMap.get(wordArray[i])) 
            this.wordMap.set(wordArray[i], arr)
        }else{
            this.wordMap.set(wordArray[i], [i])
        }
    }
    return wordMap
}