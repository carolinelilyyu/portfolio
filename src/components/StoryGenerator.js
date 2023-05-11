import {useState} from "react"
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function StoryGenerator(props) {
    const [story, setStory] = useState("")
    const isStoryFilled = (story !== "")


    const handleStory = (e) => {
        // manually refetch
        e.preventDefault();
    
        openAiGenerateStream.mutate({
                "input": story,
                "model": "euterpe-v2",
                "parameters": {
                    "use_string": true,
                    "temperature": 1,
                    "min_length": 10,
                    "max_length": 1000
                }
            },
        {
            onSuccess: ({ data }) => {
                setStory(story + "\n" +  data.output)
        } 
        });

        
    }
    

    const openAiGenerateStream = useMutation({
        mutationFn: (generateStream) => {
            return axios.post(
                "https://api.novelai.net/ai/generate", 
                generateStream,
                {
                    headers: {
                        Authorization: `Bearer ${props.accessToken}`,
                    },
                }
            )
        },
    });

    return (
        <div>
            <div id="bg-image2"></div>

            <form>
                <h1>
                Here is the playground to play in:

                </h1>
                <label htmlFor="freeform">Start writing your novel here:</label>
                <br/><br/>

                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..." value={story} onChange={(e)=> setStory(e.target.value)}>
                    {story}
                </textarea>
                <br></br>

                <Button className="notepad-send" variant="contained" onClick={(e)=>handleStory(e)} disabled={!isStoryFilled} endIcon={<SendIcon />}>
                    Send
                </Button>
            </form>
        </div>
    );
}
