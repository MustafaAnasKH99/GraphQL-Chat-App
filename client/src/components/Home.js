import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import Chat from './Chat'


const Home = () => {
    let history = useHistory()
    return ( 
        <div>
            <h1>Welcome Home!</h1>
            <Chat />
        </div>
     );
}
 
export default Home;