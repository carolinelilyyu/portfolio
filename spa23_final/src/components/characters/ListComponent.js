import React from 'react'; 
import img1 from "../../media/img/characters/img1.jpeg"
import axios from "axios";
import {OPENAI_API_KEY} from "../../index.js"
import { NOVEL_AI_KEY } from '../../index.js';
import {useMutation} from "@tanstack/react-query";
import { useState } from "react";
import JSZip from "jszip";

const ListComponent = (props) => { 
    const [accessToken, setAccessToken] = useState("")
    const [traits, setTraits] = useState("")
    const [url, setUrl] = React.useState(img1);

    // once generate picture, get rid of this

    const [currName, setCurrName] = useState('')
    const [currAge, setCurrAge] = useState('')
    const [currLore, setCurrLore] = useState('')
    const isCurrNumFilled = (currName !== "" || currAge !== "" || currLore !== "")

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!currLore) {
            alert("Lore is empty")
        }
        
        extractTraitsMutation.mutate({
            model: "text-davinci-003",
            prompt: "Can you extract traits from \n\n" + currLore,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        } ,
        {
            onSuccess: ({ data }) => {
                // console.log(data)
                var traits = data.choices[0].text
                setTraits(traits.replaceAll("-", ","))
        } 
        });
        console.log("traits are" + traits)
        // var traits = extractTraitsMutation.data?.data.choices[0].text.replaceAll("-", ",")

        openAILoginMutation.mutate({
            key: NOVEL_AI_KEY,
        },
        {
            onSuccess: ({ data }) => {
                setAccessToken(data?.accessToken)
            }
        }
        );
        console.log("accessToken is" + accessToken)
        openAIGeneratePicMutation.mutate({
                input: traits,
                model: "nai-diffusion",
                action: "generate",
                parameters: {},
        },{
            onSuccess: ({data}) =>{
                console.log(data)
                async function getImage() {
                    const zip = await JSZip.loadAsync(data);
                    const blob = await zip.file("image_0.png").async("blob");
                    // Iterate over each file in the zip archive
                    setUrl(window.URL.createObjectURL(blob));
                }
                getImage();
            }
        } );
        console.log(url)
    

    }
    const extractTraitsMutation = useMutation({
        mutationFn: (extractTraits) => {
            return axios.post(
                "https://api.openai.com/v1/completions",
                extractTraits,
                {
                    headers: {
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                    },
                } 
                )
        },
    });

    // console.log("access token is " + accessToken)
    const openAILoginMutation = useMutation({
        mutationFn: (login) => {
            return axios.post(
                "https://api.novelai.net/user/login", 
                login,
                )
        },
    })

    const openAIGeneratePicMutation = useMutation({
        mutationFn: (generatePic) => {
            return axios.post(
                "https://api.novelai.net/ai/generate-image",
                generatePic,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                responseType: "arraybuffer",
                }
            )
        },
    });

    return ( 
        <div> 
            <h3 className="characters">
                <table >
                    <tr >
                        <td>
                            <div className="imgContainer">
                                        <div>
                                            <img className="character-right" src={url} />
                                        </div>
                                        <div className="generate">
                                            <button value="test" onClick={(e)=>
                                                handleGenerate(e)
                                            }>Generate!</button>
                                        </div>
                            </div>
                        </td>
                        </tr>
                    </table>

                    <form>
                        Character Details:
                        <br/><br/>
                            Name:
                            <input type="text" name="newNumber" value={currName} onChange={(e)=> setCurrName(e.target.value)}></input>
                        <br /><br />
                        Age:
                            <input type="text" name="newNumber" value={currAge} onChange={(e)=> setCurrAge(e.target.value)}></input>
                        <br /><br />
                    
                        Lore:
                            <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..." value={currLore} onChange={(e)=> setCurrLore(e.target.value)}></textarea>
                        <br /><br />

                            <button className='character-right submit' disabled={!isCurrNumFilled} onClick={(e)=>alert(e)}>Save</button>
                    </form>
            </h3>
            {/* <h1>{props.text}</h1>  */}
        </div> 
    
    ); 

}; 

export {ListComponent};