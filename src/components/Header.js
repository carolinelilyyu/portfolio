import {Link} from 'react-router-dom'

export default function Header(){
    return (
        <div className='header'>
            <ul id='main-nav'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/structure">Structure</Link></li>
                <li><Link to="/characters">Characters</Link></li>
                <li><Link to="/world">World</Link></li>
                <li><Link to="/storygenerator">Story Generator</Link></li>
            </ul>
        </div>
    );
}