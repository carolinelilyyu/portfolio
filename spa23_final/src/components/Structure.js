export default function Structure(props) {
    return (
        <div className="structure">
            <div id="bg-image2"></div>

            <form>
                <h1>
                    Here's to keep track of some notes for yourself
                </h1>

                <p>What is the title of your story?</p>
                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..."></textarea>

                <p>What is the theme of your story?</p>
                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..."></textarea>

                <p>What is the plot of the story?</p>
                <textarea id="freeform" name="freeform" rows="20" cols="100" placeholder="Enter text here..."></textarea>

            </form>
        </div>
    );
}
