import {numberOfWins, numberOfTotalGuesses} from "./Home.js"

export default function Stats(){
    var avgGuesses = numberOfTotalGuesses / numberOfWins
    if(!isFinite(avgGuesses)){
        avgGuesses = "Make some guesses then I will show your average guesses!"
    }
    else{
        avgGuesses = "Here are your average number of guesses: " + avgGuesses
    }
    return (
        <div className = "page">
            <h2>Here are your number of wins: {numberOfWins}</h2>
            <br/><br/>
            <h2>{avgGuesses}</h2>
            <br/><br/>
        </div>
    );
}