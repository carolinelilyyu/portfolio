import {Link} from 'react-router-dom'

export default function Header(){
    return (
        <div className='header'>
            <ul id='main-nav'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/loadingscreen">Loading Screen</Link></li>
                <li><Link to="/characters">Characters</Link></li>
                <li><Link to="/world">World</Link></li>
                <li><Link to="/notepad">Notepad</Link></li>
            </ul>
        </div>
    );
}