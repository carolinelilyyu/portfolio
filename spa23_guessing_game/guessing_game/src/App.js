import {Routes, Route} from 'react-router-dom'
import { BrowserRouter as Router}from 'react-router-dom';
import {useState} from 'react';
import Home from './components/Home.js'
import Settings from './components/Settings.js'
import Header from './components/Header.js'
import Stats from './components/Stats.js'
import NotFound from './components/NotFound.js'
import "./css/style.css"



export function randomNumber(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + parseFloat(min));
}

function App() {
  const [guessNumber, setGuessNumber] = useState(10)
  const [lowestNumber, setLowestNumber] = useState(0)
  const [highestNumber, setHighestNumber] = useState(100)
  const [numbers, setNumbers] = useState([])
  const [answer, setAnswer] = useState(50)

  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <Header/> 
              <div id="bg-image"></div>

              <Home 
                guessNumber={guessNumber} 
                lowestNumber={lowestNumber}
                highestNumber={highestNumber}
                answer={answer} setAnswer={(val) => setAnswer(val)} 
                listOfGuesses={numbers} setNumbers={(val) => setNumbers(val)}
              />
            </div>
            } 
          />
          <Route path ="/settings" element={
            <div>
              <Header/>
              <div id="bg-image"></div>

              <Settings 
                guessNumber={guessNumber} setGuessNumber={(val) => setGuessNumber(val)} 
                lowestNumber={lowestNumber} setLowestNumber={(val) => setLowestNumber(val)} 
                highestNumber={highestNumber} setHighestNumber={(val) => setHighestNumber(val)} 
                answer={answer} setAnswer={(val) => setAnswer(val)} 
                listOfGuesses={numbers} setNumbers={(val) => setNumbers(val)}
              />
            </div>
            }
          />
          <Route path ="/stats" element={<div><Header/><div id="bg-image"></div><Stats /></div>} />
          <Route path="*" element={<div><Header/><NotFound /></div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
