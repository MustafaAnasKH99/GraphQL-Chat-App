import React from 'react';
import './App.css';
import SignInSide from './components/SignInSide.js';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('token');

// Create a WebSocket link :
const link = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  }
})


const subscriptionMiddleware = {
  applyMiddleware: async (options, next) => {
    options.token = `Bearer ${token}`
    next()
  },
}

link.subscriptionClient.use([subscriptionMiddleware])


const cache = new InMemoryCache();
// const link = wsLink
const client = new ApolloClient({
  link,
  cache
})

function App() {  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
        <SignInSide />
        <ToastContainer />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
