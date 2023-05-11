import { useState } from "react";

export default function Structure(props) {
    let savedTitle = localStorage.getItem("life") == null ? "" : localStorage.getItem("title");
    let savedTheme = localStorage.getItem("theme") == null? "" : localStorage.getItem("theme");
    let savedPlot = localStorage.getItem("plot") == null ? "" : localStorage.getItem("plot");

    const [title, setTitle] = useState(savedTitle)
    const [theme, setTheme] = useState(savedTheme)
    const [plot, setPlot] = useState(savedPlot)
    const isStructureFilled = (title !== "" || theme !== "" || plot !== "")

    function saveStructure(e){
        e.preventDefault();

        // Save data to localStorage
        localStorage.setItem("title", title);

        // Save data to localStorage
        localStorage.setItem("theme", theme);

        // Save data to localStorage
        localStorage.setItem("plot", plot);

    }

    function clear(){
        localStorage.removeItem("title");
        localStorage.removeItem("theme");
        localStorage.removeItem("plot");
    }

    return (
        <div className="structure">
            <div id="bg-image2"></div>

            <form>
                <h1>
                    Here's to keep track of some notes for yourself
                </h1>

                <p>What is the title of your story?</p>
                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..." value={title} onChange={(e)=> setTitle(e.target.value)}></textarea>

                <p>What is the theme of your story?</p>
                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..." value={theme} onChange={(e)=> setTheme(e.target.value)}></textarea>

                <p>What is the plot of the story?</p>
                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..." value={plot} onChange={(e)=> setPlot(e.target.value)}></textarea>

                <button className='submit' disabled={!isStructureFilled} onClick={(e)=>saveStructure(e)}>Save</button>
                <button className='clear' onClick={(e)=>clear(e)}>Clear</button>
            </form>
        </div>
    );
}
