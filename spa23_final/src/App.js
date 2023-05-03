import React from "react";
import {Routes, Route} from 'react-router-dom'
import { useState } from "react";

import Header from "./components/Header.js";
import LoadingScreen from "./components/LoadingScreen.js";
import Home from "./components/Home";
import Characters from "./components/Characters.js";
import World from "./components/World.js";
import Notepad from "./components/Notepad.js";
import "./css/style.css"

// import GenerateGrammar from "./components/openai/generateGrammar";
// import GeneratePicture from "./components/novelai/generatePicture.js"

function App() {
  const [blessings, setBlessings] = useState(1);

  return (
      <div>
        <Header />
          <Routes>
            <Route
                path="/loadingscreen"
                element={<LoadingScreen currentBlessings={blessings} />}
            />
            <Route
                path="/"
                element={
                  <Home
                    currentBlessings={blessings}
                    changeBlessings={(val) => setBlessings(val)} />}
            />
            <Route
                path="/characters"
                element={<Characters currentBlessings={blessings} />}
            />
            <Route
                path="/world"
                element={<World currentBlessings={blessings} />}
            />
            <Route path="/notepad" element={<Notepad />} />
        </Routes>
      </div>
      // <GenerateGrammar sentence={sentence}/>
  );
}

export default App;
