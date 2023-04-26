import {useState} from 'react';
import {randomNumber} from '../App.js'

export default function Settings(props){
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

    console.log(props.answer)
    return (
        <div className = "page">
            <form>
                <input type="text" placeholder="# of Guesses" value={currGuessNum} onChange={(e) => setCurrGuessNum(e.target.value)}></input>
                <br/>
                <button className="button" onClick={(e)=>handleNumberOfGuesses(e)}>Save</button>
            </form>
            

            <form>
                <input type="text" placeholder="Lowest Number" value={currLowestNumber} onChange={(e)=> setCurrLowestNumber(e.target.value)}></input>
                <br/>
                <button className="button" onClick={(e)=>handleLowestNumber(e)}>Save</button>
            </form>

            <form>
                <input type="text" placeholder="# Highest Number" value={currHighestNumber} onChange={(e)=> setCurrHighestNumber(e.target.value)}></input>
                <br/>
                <button className="button" onClick={(e)=>handleHighestNumber(e)}>Save</button>
            </form>

        </div>
        
    );
}