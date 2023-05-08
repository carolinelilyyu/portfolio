import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter as Router}from 'react-router-dom';

export const NOVEL_AI_KEY = process.env.REACT_APP_NOVEL_AI_ACCESS_TOKEN_KEY;
export const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Router>
        <App client={queryClient} />
      </Router>
    </QueryClientProvider>
);