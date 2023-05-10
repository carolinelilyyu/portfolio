import React from "react";
import {Routes, Route} from 'react-router-dom'
import { useState } from "react";

import Header from "./components/Header.js";
import LoadingScreen from "./components/LoadingScreen.js";
import Home from "./components/Home";
import Characters from "./components/characters/Characters.js";
import World from "./components/World.js";
import StoryGenerator from "./components/StoryGenerator.js";
import Structure from "./components/Structure.js";
import NotFound from "./components/NotFound.js"
import "./css/style.css"


import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import { NOVEL_AI_KEY } from './index.js';


// import GenerateGrammar from "./api/openai/generateGrammar.js"
// import GenerateStory from "./api/novelai/generateStory.js"
// import GeneratePicture from "../api/novelai/generatePicture.js"

function App(props) {
  const [blessings, setBlessings] = useState(1);
  const [text, setText] = useState("")
  const [accessToken, setAccessToken] = useState("")

    // accessToken logs in from Home. In the future, will implement a logging in system
    const loginNovelAi = (e) => {
      e.preventDefault();
      openAILoginMutation.mutate({
          key: NOVEL_AI_KEY,
      },
      {
          onSuccess: ({ data }) => {
              setAccessToken(data?.accessToken)
          }
      });
  }

  const openAILoginMutation = useMutation({
      mutationFn: (login) => {
          return axios.post(
              "https://api.novelai.net/user/login", 
              login,
              )
      },
      });

  return (
      <div>
        <Header />
        <button onClick={(e)=>loginNovelAi(e)}>login</button>

          <Routes>
            <Route
                path="/"
                element={
                  <Home
                    currentBlessings={blessings}
                    changeBlessings={(val) => setBlessings(val)} />}
            />
            <Route
                path="/characters"
                element={<Characters 
                  currentBlessings={blessings} 
                  client = {props.client}
                  />}
            />
            <Route
                path="/world"
                element={<World currentBlessings={blessings} />}
            />
            <Route path="/storygenerator" element={
              <StoryGenerator 
                accessToken={accessToken}
                text={text}
                setText={setText}
              />} />
            <Route path="/Structure" element={
              <Structure 
              />} />
            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
        {/* <GenerateStory sentence={sentence}/> */}
      </div>
  );
}

export default App;
