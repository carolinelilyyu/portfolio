import { useState } from "react";
export default function World(props) {
    let savedLife = localStorage.getItem("life") == null ? "" : localStorage.getItem("life");
    let savedBeliefs = localStorage.getItem("beliefs") == null?  "" : localStorage.getItem("beliefs");
    let savedConflicts = localStorage.getItem("conflicts") == null ? "" : localStorage.getItem("conflicts");
    let savedEvents = localStorage.getItem("events") == null ? "":  localStorage.getItem("events");

    const [life, setLife] = useState(savedLife)
    const [beliefs, setBeliefs] = useState(savedBeliefs)
    const [conflicts, setConflicts] = useState(savedConflicts)
    const [events, setEvents] = useState(savedEvents)

    const isWorldFilled = (life !== "" || beliefs !== "" || conflicts !== "" || events !== "")

    function saveWorld(e){
        e.preventDefault();
        alert("pressed")

        // Save data to localStorage
        localStorage.setItem("life", life);

        // Save data to localStorage
        localStorage.setItem("beliefs", beliefs);

        // Save data to localStorage
        localStorage.setItem("conflicts", conflicts);

        // Save data to localStorage
        localStorage.setItem("events", events);
    }

    function clear(){
        localStorage.removeItem("life");
        localStorage.removeItem("conflicts");
        localStorage.removeItem("beliefs");
        localStorage.removeItem("events");
    }

    return (
        <div>
            <div id="bg-image2"></div>
            <form>
                        <h1>Here are some world building / environment questions to build your story</h1>
                        <br/><br/>
                        <h3>What is the overall hierarchy of how life works?</h3>
                        <br/><br/>
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={life} onChange={(e)=> setLife(e.target.value)}></textarea>

                        <br /><br />
                        <h3>Are there gods or any major belief systems that help drive the people in the world's daily decisions</h3>
                        <br /><br />
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={beliefs} onChange={(e)=> setBeliefs(e.target.value)}></textarea>

                        <br/><br/>
                        <h3>What kind of conflict takes place in this world?</h3>
                        <br/><br/>
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={conflicts} onChange={(e)=> setConflicts(e.target.value)}></textarea>
                        
                        <br /><br />
                        <h3>What kind of major events have happened in this world to help shape what it is?</h3>
                        <br/><br/>
                        <textarea id="freeform" name="freeform" rows="10" cols="100" placeholder="Enter text here..." value={events} onChange={(e)=> setEvents(e.target.value)}></textarea>
                        <br/><br/>

                        <button className='submit' disabled={!isWorldFilled} onClick={(e)=>saveWorld(e)}>Save</button>
                        <br/><br/>

                        <button className='clear' onClick={(e)=>clear(e)}>Clear</button>

            </form>
        </div>
    );
}
