import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter as Router}from 'react-router-dom';
const { Configuration, OpenAIApi } = require("openai");

// export const NOVEL_AI_KEY = process.env.NOVEL_AI_ACCESS_TOKEN_KEY;
// export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const NOVEL_AI_KEY = process.env.NOVEL_AI_ACCESS_TOKEN_KEY;
export const OPENAI_API_KEY = "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";
const configuration = new Configuration({
    organization: "org-FLaa8auL0Es50SepxkkOyNJp",
    apiKey: OPENAI_API_KEY,
});
delete configuration.baseOptions.headers['User-Agent'];
console.log(OPENAI_API_KEY)
export const openai = new OpenAIApi(configuration);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
);