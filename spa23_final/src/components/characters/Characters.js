// import {img1, img2, img3} from "../media/img/characters"
import { useState } from "react";
import {ListComponent} from "./ListComponent.js"
import GeneratePicture from "../../api/novelai/generatePicture.js";

export default function Characters(props) {
    const [components, setComponents] = useState(["Sample Component"]); 
    function addCharacter() { 
        setComponents([...components, "Sample Component"]) 
    }
    return (
        <div>
                <div id="bg-image2"></div>

                {components.map((item, i) => (<ListComponent 
                    text={item} key={i} client={props.client}
                    /> ))}
                <div className="add">
                    <button className="addRow" onClick={addCharacter} text="Call Component">+</button> 
                </div>
        </div>
    );
}
