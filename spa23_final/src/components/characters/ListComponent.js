import React from 'react'; 
import img1 from "../../media/img/characters/img1.jpeg"
import axios from "axios";
import {OPENAI_API_KEY} from "../../index.js"
import {useMutation} from "@tanstack/react-query";
import { useState } from "react";
import JSZip from "jszip";


const ListComponent = (props) => {  
    console.log(sessionStorage.getItem("charactersData"))

    let savedUrl = sessionStorage.getItem("url") == null ? img1: sessionStorage.getItem("url");
    var savedCharacterData = sessionStorage.getItem("charactersData")
    if (savedCharacterData != null){
        savedCharacterData = JSON.parse(savedCharacterData)
        console.log(savedCharacterData)
    }
    console.log(props.index)
    // console.log(savedCharacterData.length == 0)
    const [traits, setTraits] = useState("")

    let savedCurrName =  savedCharacterData[props.index] == null ? "" : savedCharacterData[props.index][0]
    let savedCurrAge = savedCharacterData[props.index] == null ? "" : savedCharacterData[props.index][1]
    let savedCurrLore = savedCharacterData[props.index] == null ? "" : savedCharacterData[props.index][2]
    
    // once generate picture, get rid of this
    const [currName, setCurrName] = useState(savedCurrName)
    const [currAge, setCurrAge] =  useState(savedCurrAge)
    const [currLore, setCurrLore] =  useState(savedCurrLore)
    const [url, setUrl] = useState(savedUrl);

    console.log("currname is " + currLore)
    const isCurrNumFilled = (currName !== "" || currAge !== "" || currLore !== "")
    

    function saveCharacterData(e){
        e.preventDefault();
        // string becomes array
        if(sessionStorage.getItem("charactersData") == null){
            sessionStorage.setItem("charactersData", "[]")
        }
        var charactersDataArray = JSON.parse(sessionStorage.getItem('charactersData'))
        if (charactersDataArray[props.index] != null){
            charactersDataArray[props.index] = [currName, currAge, currLore]
        }else{
            charactersDataArray.push([currName, currAge, currLore])
        }
        
        sessionStorage.setItem('charactersData', JSON.stringify(charactersDataArray))
        console.log("this is the get " + sessionStorage.getItem('charactersData'))
    }


    function clear(){
        sessionStorage.removeItem("charactersData");

    }

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
        // console.log("traits are" + traits)
        // var traits = extractTraitsMutation.data?.data.choices[0].text.replaceAll("-", ",")

        openAIGeneratePicMutation.mutate({
                input: traits,
                model: "nai-diffusion",
                action: "generate",
                parameters: {},
        },{
            onSuccess: ({data}) =>{
                // console.log(data)
                async function getImage() {
                    const zip = await JSZip.loadAsync(data);
                    const blob = await zip.file("image_0.png").async("blob");
                    // Iterate over each file in the zip archive
                    setUrl(window.URL.createObjectURL(blob));
                }
                getImage();
            }
        } );
        // console.log(url)
    

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

    const openAIGeneratePicMutation = useMutation({
        mutationFn: (generatePic) => {
            return axios.post(
                "https://api.novelai.net/ai/generate-image",
                generatePic,
                {
                    headers: {
                        Authorization: `Bearer ${props.accessToken}`,
                    },
                responseType: "arraybuffer",
                }
            )
        },
    });

    return ( 
        <div className="characters"> 
            <h3 className="character">
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

                            <button className='character-right submit' disabled={!isCurrNumFilled} onClick={(e)=>saveCharacterData(e)}>Save</button>
                            <button className='clear' onClick={(e)=>clear(e)}>Clear</button>

                    </form>
            </h3>
            {/* <h1>{props.text}</h1>  */}
        </div> 
    
    ); 

}; 

export {ListComponent};