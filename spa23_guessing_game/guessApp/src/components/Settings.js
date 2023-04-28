import {useState} from 'react';
import {randomNumber} from '../App.js'

export default function Settings(props){
    const [currGuessNum, setCurrGuessNum] = useState('')
    const [currLowestNumber, setCurrLowestNumber] = useState('')
    const [currHighestNumber, setCurrHighestNumber] = useState('')

    const isCurrGuessFilled = (currGuessNum != "" && Number.isInteger(parseInt(currGuessNum)))
    const isCurrLowestFilled = (currLowestNumber != "" && Number.isInteger(parseInt(currLowestNumber)))
    const isCurrHighestFilled = (currHighestNumber != "" && Number.isInteger(parseInt(currHighestNumber)))

    function handleNumberOfGuesses(e){
        e.preventDefault();
        props.setGuessNumber(currGuessNum)        
    }


    function handleLowestNumber(e){
        e.preventDefault();
        props.setLowestNumber(currLowestNumber)
        props.setAnswer(randomNumber(currLowestNumber, props.highestNumber))
        props.setNumbers([])
    }


    function handleHighestNumber(e){
        e.preventDefault();
        props.setHighestNumber(currHighestNumber)   
        props.setAnswer(randomNumber(props.lowestNumber, currHighestNumber))
        props.setNumbers([])
    }

    return (
        <div className = "page">
            <form>
                <input type="text" placeholder="# of Guesses" value={currGuessNum} onChange={(e) => setCurrGuessNum(e.target.value)}></input>
                <br/>
                <button className="button" disabled={!isCurrGuessFilled} onClick={(e)=>handleNumberOfGuesses(e)}>Save</button>
            </form>
            

            <form>
                <input type="text" placeholder="Lowest Number" value={currLowestNumber} onChange={(e)=> setCurrLowestNumber(e.target.value)}></input>
                <br/>
                <button className="button" disabled={!isCurrLowestFilled} onClick={(e)=>handleLowestNumber(e)}>Save</button>
            </form>

            <form>
                <input type="text" placeholder="# Highest Number" value={currHighestNumber} onChange={(e)=> setCurrHighestNumber(e.target.value)}></input>
                <br/>
                <button className="button" disabled={!isCurrHighestFilled} onClick={(e)=>handleHighestNumber(e)}>Save</button>
            </form>

        </div>
        
    );
}