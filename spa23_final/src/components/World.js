import { useState } from "react";

export default function World(props) {
    let savedLife = sessionStorage.getItem("life") == null ? "" : sessionStorage.getItem("life");
    let savedBeliefs = sessionStorage.getItem("beliefs") == null?  "" : sessionStorage.getItem("beliefs");
    let savedConflicts = sessionStorage.getItem("conflicts") == null ? "" : sessionStorage.getItem("conflicts");
    let savedEvents = sessionStorage.getItem("events") == null ? "":  sessionStorage.getItem("events");

    const [life, setLife] = useState(savedLife)
    const [beliefs, setBeliefs] = useState(savedBeliefs)
    const [conflicts, setConflicts] = useState(savedConflicts)
    const [events, setEvents] = useState(savedEvents)

    const isWorldFilled = (life !== "" || beliefs !== "" || conflicts !== "" || events !== "")

    function saveWorld(e){
        e.preventDefault();
        alert("pressed")

        // Save data to sessionStorage
        sessionStorage.setItem("life", life);

        // Save data to sessionStorage
        sessionStorage.setItem("beliefs", beliefs);

        // Save data to sessionStorage
        sessionStorage.setItem("conflicts", conflicts);

        // Save data to sessionStorage
        sessionStorage.setItem("events", events);
    }

    function clear(){
        sessionStorage.removeItem("life");
        sessionStorage.removeItem("conflicts");
        sessionStorage.removeItem("beliefs");
        sessionStorage.removeItem("events");
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
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={events} onChange={(e)=> setEvents(e.target.value)}></textarea>

                        <button className='submit' disabled={!isWorldFilled} onClick={(e)=>saveWorld(e)}>Save</button>
                        <button className='clear' onClick={(e)=>clear(e)}>Clear</button>

            </form>
        </div>
    );
}
