import {useState} from 'react';

export var numberOfWins = 0;
export var numberOfTotalGuesses = 0;

function highOrLow(currNumber, answer){
    if(currNumber > answer){
        alert("This number is too high")
    }else if(currNumber < answer){
        alert("This number is too low")
    }else{
        alert("Guessed right!")
        numberOfWins++;
    }
    numberOfTotalGuesses++;
}


export function Home(props){
    var answer = 50;
    console.log(props)
    var currGuesses = props.guessNumber;

    const [currNumber, setCurrNumber] = useState('')
    var num = [];
    const [numbers, setNumbers] = useState(num)

    function handleNewNumber(e){
        e.preventDefault();
        currGuesses--;
        highOrLow(currNumber, answer)
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
        <p className='info'>Number of guesses left: {currGuesses}</p>
        <p className='info'>Lowest number is: {props.lowestNumber}</p>
        <p className='info'>Highest number is: {props.highestNumber}</p>
        <hr/>
        <ul className='info number-list'>
            {numbers.map((number, i)=><li key={i}>{number}</li>)}
        </ul>
    </div>
    );
}