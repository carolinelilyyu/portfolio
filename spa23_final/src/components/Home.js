import React from "react";
import Typed from 'typed.js';

export default function Home(props) {
    // Create reference to store the DOM element containing the animation
    const el = React.useRef(null);

    React.useEffect(() => {
    const typed = new Typed(el.current, {
        strings: [' a fantasy world.', ' a cyberpunk universe.', ' the misadventures of a gang.', ' a tragic murder mystery.', "a quirky love story.", "a bully autobiography"],
        typeSpeed: 50,
        loop: true,
    });

    return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
    };
    }, []);
    
    return (
        <div>
            <div id="bg-image"></div>
            <div className="home">

                <div>
                        <span className="font-color">
                            Write about
                        </span>
                        <br></br>
                        <span className="font-color" ref={el}></span>
                        
                        <h3 className="description">Nook AI is a powerful writing tool that will assist you to bring your story to life. This platform will help you to create characters, worlds, visual images, interactions; but <i>never</i> will it write the story for you. To top it off, everything is written in AI. </h3>

                        <div id="character-sample"></div>
                        <div className="categories">
                            <div id="structure-img"></div>
                            <div id="world-building-img"></div>
                            <div id="story-generation-img"></div>

                        </div>

                </div>
                
            
            </div>
        </div>
        
    );
}
