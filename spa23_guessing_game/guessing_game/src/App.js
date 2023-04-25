import {Routes, Route, Link} from 'react-router-dom'
import { BrowserRouter as Router}from 'react-router-dom';
import {useState} from 'react';
import {Home} from './Home.js'
import {Settings} from './Settings.js'
import {Stats} from './Stats.js'
import {NotFound} from './NotFound.js'
import "./app_gs.css"

function Nav(){
return (
    <ul id='main-nav'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/stats">Stats</Link></li>
    </ul>
);
}

function Header(){
return (
    <div className='header'>
        <Nav />
    </div>
);
}

function App() {
  const [guessNumber, setGuessNumber] = useState(10)
  const [lowestNumber, setLowestNumber] = useState(0)
  const [highestNumber, setHighestNumber] = useState(100)
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <Header/> 
              <Home 
                guessNumber={guessNumber} 
                lowestNumber={lowestNumber}
                highestNumber={highestNumber}
              />
            </div>
            } 
          />
          <Route path ="/settings" element={
            <div>
              <Header/>
              <Settings 
                guessNumber={guessNumber} setGuessNumber={(val) => setGuessNumber(val)} 
                lowestNumber={lowestNumber} setLowestNumber={(val) => setLowestNumber(val)} 
                highestNumber={highestNumber} setHighestNumber={(val) => setHighestNumber(val)} 
              />
            </div>
            }
          />
          <Route path ="/stats" element={<div><Header/><Stats /></div>} />
          <Route path="*" element={<div><Header/><NotFound /></div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
