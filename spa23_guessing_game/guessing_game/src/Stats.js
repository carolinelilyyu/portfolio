import {numberOfWins, numberOfTotalGuesses} from "./Home.js"

export function Stats(){
    return (
        <div className = "page">
            <h2>Here are your number of wins: {numberOfWins}</h2>
            <br/><br/>
            <h2>Here are your average number of guesses: {numberOfTotalGuesses / numberOfWins}</h2>
            <br/><br/>
        </div>
    );
}