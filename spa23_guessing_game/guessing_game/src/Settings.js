import {useState} from 'react';

export function Settings(props){
    const [currGuessNum, setCurrGuessNum] = useState('')
    const [currLowestNumber, setCurrLowestNumber] = useState('')
    const [currHighestNumber, setCurrHighestNumber] = useState('')


    function handleNumberOfGuesses(e){
        e.preventDefault();
        props.setGuessNumber(currGuessNum)        
    }


    function handleLowestNumber(e){
        e.preventDefault();
        props.setLowestNumber(currLowestNumber)        
    }


    function handleHighestNumber(e){
        e.preventDefault();
        props.setHighestNumber(currHighestNumber)        
    }

    return (
        <div className = "page">
            <form>
                <input type="text" value={currGuessNum} onChange={(e) => setCurrGuessNum(e.target.value)}></input>
                <button onClick={(e)=>handleNumberOfGuesses(e)}>Change Number of Guesses</button>
            </form>
            

            <form>
                <input type="text" value={currLowestNumber} onChange={(e)=> setCurrLowestNumber(e.target.value)}></input>
                <button onClick={(e)=>handleLowestNumber(e)}>Change Lowest Number</button>
            </form>

            <form>
                <input type="text" value={currHighestNumber} onChange={(e)=> setCurrHighestNumber(e.target.value)}></input>
                <button onClick={(e)=>handleHighestNumber(e)}>Change Highest Number</button>
            </form>

        </div>
        
    );
}