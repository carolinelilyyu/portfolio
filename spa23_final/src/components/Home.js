export default function Home(props) {
    return (
        <div className="home-container">
            <p>
                Welcome to the most Christian, most holy website you have ever seen.
            </p>
            <p>How many blessings would you like to give today?</p>
            <input
                type="number"
                className="number-input"
                min="1"
                max="24"
                value={props.currentBlessings}
                onChange={(event) => props.changeBlessings(event.target.value)}
            />
    </div>
    );
}
