// import {img1, img2, img3} from "../media/img/characters"
import { useState } from "react";
import {ListComponent} from "./ListComponent.js"
import GeneratePicture from "../../api/novelai/generatePicture.js";

export default function Characters(props) {
    const [index, setIndex] = useState(1); 
    const [components, setComponents] = useState([0]); 
    const Characters = () => {
        const character = components.map((item, i)=>
            <ListComponent 
                text={item} 
                key={i} 
                index={index} 
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
