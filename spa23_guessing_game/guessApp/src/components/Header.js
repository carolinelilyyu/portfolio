import {Link} from 'react-router-dom'
import logo from '../media/bear.png' // Tell Webpack this JS file uses this image


export default function Header(){
    return (
        <div className='header'>
            <ul id='main-nav'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/stats">Stats</Link></li>
                <img id='main-nav-logo' src={logo}></img>
            </ul>
        </div>
    );
}