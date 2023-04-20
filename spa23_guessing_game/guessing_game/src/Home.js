import {useState} from 'react';
import {defaultNumberOfGuesses, defaultAnswer, defaultHighestNumber, defaultLowestNumber} from './Settings.js'

var answer = defaultAnswer;
export var numberOfGuesses = defaultNumberOfGuesses;
export var numberOfWins = 0;

function highOrLow(currNumber){
    if(currNumber > answer){
        alert("This number is too high")
    }else if(currNumber < answer){
        alert("This number is too low")
    }else{
        alert("Guessed right!")
        numberOfWins++;
    }
}

function NumberForm(){
    const [currNumber, setCurrNumber] = useState('')
    var num = [];
    const [numbers, setNumbers] = useState(num)

    function handleNewNumber(e){
        e.preventDefault();
        numberOfGuesses--;
        highOrLow(currNumber)
        setNumbers((n)=>[...n, currNumber])
        setCurrNumber('');
    }

    return (
    <div>
        <form>
            Put your guess number down:
            <input type="text" name="newNumber" value={currNumber} onChange={(e)=> setCurrNumber(e.target.value)}></input>
            <br /><br />
            <button onClick={(e)=>handleNewNumber(e)}>Add Number</button>
        </form>
        <p className='info'>Number of guesses left: {numberOfGuesses}</p>
        <hr/>
        <ul className='info number-list'>
            {numbers.map((number, i)=><li key={i}>{number}</li>)}
        </ul>
    </div>
    );
}

export function Home(){
    return (
        <div><NumberForm /></div>
    );
}