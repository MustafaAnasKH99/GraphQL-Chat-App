import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignInSide from './components/SignInSide.js';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home'
import Chat from './components/Chat'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
        <Router>
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
      </Router>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
