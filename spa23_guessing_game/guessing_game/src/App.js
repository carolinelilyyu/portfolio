import {Routes, Route, Link} from 'react-router-dom'
import { BrowserRouter as Router}from 'react-router-dom';
import {Home} from './Home.js'
import {Settings} from './Settings.js'
import {Stats} from './Stats.js'
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

function HomePage(){
  return (
    <div className = "page">
      <Header />
      <Home />
    </div>
  );
}

function SettingsPage(){
  return (
    <div className = "page">
      <Header />
      <Settings />
    </div>
  );
}

function StatsPage(){
  return (
    <div className = "page">
      <Header />
      <Stats />
    </div>
  );
}

function NotFoundPage(){
  return (
    <div className = "page">
      <Header />
      <h1>Oh no! There's no such page</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ="/settings" element={<SettingsPage />} />
        <Route path ="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
