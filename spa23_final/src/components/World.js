import { useState } from "react";

export default function World(props) {
    const [life, setLife] = useState('')
    const [beliefs, setBeliefs] = useState('')
    const [conflicts, setConflicts] = useState('')
    const [events, setEvents] = useState('')

    const isWorldFilled = (life !== "" || beliefs !== "" || conflicts !== "")

    function handeWorld(e){
        e.preventDefault();
        alert("pressed")
    }
    return (
        <div>
            <div id="bg-image2"></div>

            <form>
                        <h1>Here are some world building / environment questions to build your story</h1>
                        <br/><br/>
                        What is the overall hierarchy of how life works?
                        <br/><br/>
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={life} onChange={(e)=> setLife(e.target.value)}></textarea>

                        <br /><br />
                        Are there gods or any major belief systems that help drive the people in the world's daily decisions
                        <br /><br />
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={beliefs} onChange={(e)=> setBeliefs(e.target.value)}></textarea>

                        <br/><br/>
                        What kind of conflict takes place in this world?
                        <br/><br/>
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={conflicts} onChange={(e)=> setConflicts(e.target.value)}></textarea>
                        
                        <br /><br />
                        What kind of major events have happened in this world to help shape what it is?
                        <br/><br/>
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={conflicts} onChange={(e)=> setConflicts(e.target.value)}></textarea>

                        <button className='submit' disabled={!isWorldFilled} onClick={(e)=>handeWorld(e)}>Save</button>
            </form>
        </div>
    );
}
