import {useState} from 'react';
import { randomNumber } from '../App';

export var numberOfWins = 0;
export var numberOfTotalGuesses = 0;

export default function Home(props){
    
    var [currGuesses, setCurrGuesses] = useState(props.guessNumber);

    const [currNumber, setCurrNumber] = useState('')


    function highOrLow(currNumber, answer){
        if(currNumber > answer){
            return "high"
        }else if(currNumber < answer){
            return "low"
        }else if (currNumber == answer){
            return "right"
        }else{
            return "wrong"
        }
    }

    function guess(result){
        if(result == "high"){
            alert("This number is too high")
        }else if(result == "low"){
            alert("This number is too low")
        }else if (result == "right"){
            alert("Guessed right!")
            numberOfWins++;
            var newNum = randomNumber(props.lowestNumber, props.highestNumber);
            props.setAnswer(newNum)
            setCurrGuesses(props.guessNumber)
        }
        numberOfTotalGuesses++;
    }

    function handleNewNumber(e){
        var result = highOrLow(currNumber, props.answer)
        e.preventDefault();
        if(currGuesses <= 0){
            alert("No more guesses!")
        }
        
        if(result == "wrong"){
            alert("Only enter numbers.")
        }
        else{
            setCurrGuesses(currGuesses-1)
            guess(result)
            props.setNumbers((n)=>[...n, currNumber])
            setCurrNumber('');
        }
    }

    const isCurrNumFilled = (currNumber != "")

    return (
    <div className='guessing-game'>
        <div id='home'> 
            <h1 id='title'>Guessing Game</h1>
            <div id='debug'>Answer: {props.answer}</div>

            <form>
                Put your guess number down:
                <br/><br/>
                <input type="text" name="newNumber" value={currNumber} onChange={(e)=> setCurrNumber(e.target.value)}></input>
                <br /><br />
                <button className='button' disabled={!isCurrNumFilled} onClick={(e)=>handleNewNumber(e)}>Guess!</button>
            </form>
        </div>

        <div id="home-flex">
            <div id='home-info'>
                <p className='info'>Number of guesses left: {currGuesses}</p>
                <p className='info'>Lowest number is: {props.lowestNumber}</p>
                <p className='info'>Highest number is: {props.highestNumber}</p>
            </div>

            
            <div id='home-box'>
                List of Guesses
                <ul id='number-list'>
                    {props.listOfGuesses.map((number, i)=><li key={i}>{number}</li>)}
                </ul>
            </div>
        </div>
    </div>
    );
}