import {useState} from "react"
import axios from "axios";
import {NOVEL_AI_KEY} from "../index.js"
import {useQuery} from "@tanstack/react-query";



export default function StoryGenerator(props) {
    // emulates a fetch (useQuery expects a Promise)
    const emulateFetch = _ => {
        return new Promise(resolve => {
        resolve([{ data: "ok" }]);
        });
    };
    
    const handleClick = (e) => {
        // manually refetch
        e.preventDefault();
        refetch();
    };

    const { data, refetch } = useQuery({
        enabled: false, // disable this query from automatically running
        queryKey: ["login"],
        queryFn: () =>
        axios
            .post("https://api.novelai.net/user/login", {
            key: NOVEL_AI_KEY,
            })
            .then(({ data }) =>
            axios.post(
                "https://api.novelai.net/ai/generate-stream",
                {
                    "input": "Toff took the pen",
                    "model": "euterpe-v2",
                    "parameters": {
                        "use_string": true,
                        "temperature": 1,
                        "min_length": 10,
                        "max_length": 100
                    }
                },
                {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                },
                }
            )
            ),
    });
        // return data?.data;
    
    
    function addToText(initialText){
        // after click, this newText will be in place of original text
        var newText = initialText + " also testing this"
    }

    function handleStory(e){
        e.preventDefault();
        addToText(props.text)
    }

    return (
        <div>
            <div id="bg-image2"></div>

            <form>
                <h1>
                Here is the playground to play in:

                </h1>
                <label htmlFor="freeform">Start writing your novel here:</label>
                <br/><br/>

                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..." value={props.text} onChange={(e)=> props.setText(e.target.value)}>
                    {props.text}
                </textarea>
                <br></br>
                <button className="notepad-send" onClick={(e)=>handleClick(e)}>Send</button> 
            </form>
        </div>
    );
}
