$(document).ready(function () {
    const NUMBER_OF_GUESSES = 6
    var wordle = new Wordle('moody', NUMBER_OF_GUESSES)
    // width x height
    var wordleboard = initBoard(5, 6);
    var keys = initKeyboard();
    wordle.initDebugAnswer();
    ReactDOM.render(wordleboard, board);
    ReactDOM.render(keys, keyboard);

    // Hard code the guesses start
    var guess1 = "might"
    var guess2 = "flood"
    var guess3 = "stray"
    var guess1answer = wordle.guess(guess1)
    var guess1render = React.createElement("div", {className: "answer"}, "The first guess " + guess1 +  " is: " + guess1answer)
    var guess2answer =  wordle.guess("flood")
    var guess2render = React.createElement("div", {className: "answer"}, "The second guess " + guess2 +  " is: " + guess2answer)
    var guess3anwser = wordle.guess("stray")
    var guess3render = React.createElement("div", {className: "answer"}, "The third guess " + guess3 +  " is: " + guess3anwser)
    ReactDOM.render(guess1render, might);
    ReactDOM.render(guess2render, flood);
    ReactDOM.render(guess3render, stray);
    // Hard code the guesses end



    function Cell({column}){
        return React.createElement("div", {className: "cell", id: column}, null);
    }

    function Row({columnNum}){
        var column = Array(columnNum).fill(0)
        return React.createElement("div", {className: "column"}, column.map((item, i)=>React.createElement(Cell, {column: i, key: i}, null)));
        
    }

    function initBoard(rowNum, columnNum){
        var row = Array(rowNum).fill(0)
        var wordleboard = React.createElement("div", {className: "row"}, row.map((item, i)=>React.createElement(Row, {columnNum: columnNum, key: i}, null)));
        return wordleboard;
    }

    function KeyboardCell({i, letter}){
        return React.createElement("button", {className: "key", key:i}, letter);
    }
    function KeyboardRow({row, rowNum}){
        return React.createElement("div", {className: "row" + (rowNum+1)}, row.map((item, i)=>React.createElement(KeyboardCell, {key:i, i:i, letter: item},null)));
    }
    function initKeyboard(){
        var row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
        var row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
        var row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
        var keyboardRows = [row1, row2, row3]
    
        var rows=  keyboardRows.map((row, rowNum)=>React.createElement(KeyboardRow, {row: row, rowNum:rowNum, key:rowNum}, null))
        console.log(rows)
        return rows;
    }


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

    // makes a button to allow the user to "debug"/see the answer
    initDebugAnswer(){
        var debug = document.getElementById("debug")
        debug.addEventListener("click", (e)=>{
            debug.innerHTML = this.answer
        })
    }

    // guess first checks if the word is real, if so, it'll do the checkAnswer algorithm
    guess(word){
        // ADDED THIS: START
        var guessArray = word.split("")
        // ADDED THIS: END

        var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
        var responseBool = false;
        var wordle = this;
        fetch(url).then(function(response){
            // The API call was successful!
            if(response.status === 200){
                var displayColorRow = wordle.checkAnswer(guessArray)
                var winningDisplayColor = ['g', 'g', 'g', 'g', 'g']
                // wordle.colorCell(displayColorRow)
                wordle.nextRow()
                if(JSON.stringify(displayColorRow) === JSON.stringify(winningDisplayColor)){
                    // var peped = document.getElementById("peped")
                    // peped.classList.remove("hidden")
                    toastr.success("YOU WIN! Restarting game...")
                    setTimeout(function(){window.location.reload();}, 5000);
                }     
            }
            else{
                toastr.error("Not a real word!")
            }
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
        return responseBool
    }


    // clears the row
    nextRow(){
        this.nextLetter = 0
        this.guessArray = []
        this.displayColor =  ['b', 'b', 'b', 'b', 'b']
        this.answerArray = this.answer.split("")
    }

    // instead of splitting the word, give the whole array of letters
    checkAnswer(guessArray){
        console.log(guessArray)
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
                    // if(!usedLetters.includes(guessElement)){
                    //     usedLetters.push(guessElement)
                    // }
                    // document.getElementById("used-letters").innerHTML = usedLetters.join(" ")
                }
            }
        })
        return displayColor
    }

    // // given an array of colors, make the boxes corresponding to its color
    // colorCell(displayColorRow){
    //     var guessesRemaining =  this.guessesRemaining
    //     let row = document.getElementsByClassName("row")[6 - guessesRemaining]
    //     displayColorRow.forEach(function(element, index){
    //         if(element === 'g'){
    //             row.children[index].classList.add('green')
    //         }else if(element === 'y'){
    //             row.children[index].classList.add('yellow')
    //         }else{
    //             row.children[index].classList.add('gray')
    //         }
    //     });
    // }
};