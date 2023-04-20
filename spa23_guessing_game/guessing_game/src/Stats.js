import {numberOfGuesses, numberOfWins} from "./Home.js"

export function Stats(){
    return (
        <div>
            <h2>Here are your number of wins: {numberOfWins}</h2>
            <br/><br/>
            <h2>Here are your average number of guesses: {numberOfGuesses / numberOfWins}</h2>
            <br/><br/>
        </div>
    );
}