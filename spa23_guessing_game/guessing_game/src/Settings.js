import {useState} from 'react';

export var defaultNumberOfGuesses = 10;
export var defaultLowestNumber = 0;
export var defaultHighestNumber = 100;
export var defaultAnswer = 50;


function NumberOfGuesses(){
    const [numberOfGuesses, setNumberOfGuesses] = useState('')

    function handleNumberOfGuesses(e){
        alert(numberOfGuesses)
        defaultNumberOfGuesses = e
        
    }
    return (
        <div>
            <form>
                <input type="text" value={numberOfGuesses} onChange={(e)=> setNumberOfGuesses(e.target.value)}></input>
                <button onClick={(e)=>handleNumberOfGuesses(e)}>Change Number of Guesses</button>
            </form>
        </div>
        
    );
}

function LowestNumber(){
    const [lowestNumber, setLowestNumber] = useState('')

    function handleLowestNumber(e){
        alert(lowestNumber)
        defaultLowestNumber = e
        
    }
    return (
        <div>
            <form>
                <input type="text" value={lowestNumber} onChange={(e)=> setLowestNumber(e.target.value)}></input>
                <button onClick={(e)=>handleLowestNumber(e)}>Change Lowest Number</button>
            </form>
        </div>
    );
}

function HighestNumber(){
    const [highestNumber, setHighestNumber] = useState('')

    function handleHighestNumber(e){
        alert(highestNumber)
        defaultHighestNumber = e
        
    }
    return (
        <div>
            <form>
                <input type="text" value={highestNumber} onChange={(e)=> setHighestNumber(e.target.value)}></input>
                <button onClick={(e)=>handleHighestNumber(e)}>Change Highest Number</button>
            </form>
        </div>
    );
}

export function Settings(){
    return (
        <div>
            <div><NumberOfGuesses /></div>
            <div><LowestNumber /></div>
            <div><HighestNumber /></div>
        </div>
    );
}