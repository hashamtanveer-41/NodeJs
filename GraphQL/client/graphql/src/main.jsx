import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";

// Create the link explicitly
const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql",
});

// Pass the link directly into the options object
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ApolloProvider client={client} >
         <App />
      </ApolloProvider>
  </StrictMode>,
)
