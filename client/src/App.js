import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignInSide from './components/SignInSide.js';
import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from "subscriptions-transport-ws";

import { getMainDefinition } from 'apollo-utilities';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('token');


// Create an http link:
// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql',
//   options: {
//     reconnect: true,
    // headers: {
    //   authorization: token ? `Bearer ${token}` : ''
    // }
//   }
// });

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
        {/* <Router>
        <Switch>
          <Route path="/signin">
            <SignInSide />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/messages">
            <Chat />
          </Route>
        </Switch>
      </Router> */}
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
