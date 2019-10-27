import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignInSide from './components/SignInSide.js';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home'
import Chat from './components/Chat'

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// Create a WebSocket link :
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
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
