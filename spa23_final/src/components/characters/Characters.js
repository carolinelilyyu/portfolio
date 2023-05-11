import { useState } from "react";
import {ListComponent} from "./ListComponent.js"

export default function Characters(props) {
    const [index, setIndex] = useState(1); 
    const [components, setComponents] = useState(["character"]); 

    // Save details about characters as an array
    // localStorage.setItem("charactersData", "[]");


    const Characters = () => {
        const character = components.map((item, i)=>
            <ListComponent 
                text={item} 
                key={i}
                index={i}
                accessToken={props.accessToken}>
            </ListComponent>)
        return <header>{character}</header>
    }
    function addCharacter() { 
        setIndex(index+1)
        setComponents([...components, index]) 
    }

    return (
        <div>
                <div id="bg-image2"></div>
                <Characters />
                <div className="add">
                    <button className="addRow" onClick={addCharacter} text="Call Component">+</button> 
                </div>
        </div>
    );
}
