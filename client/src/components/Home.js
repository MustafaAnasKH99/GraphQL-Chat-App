import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import Chat from './Chat'


const Home = () => {
    let history = useHistory()
    return ( 
        <div>
            <h1>Welcome Home!</h1>
            <Chat />
            <h1>Go to messages</h1>
            <button onClick={() => {
                history.push('/messages')
            }}>Join Us!
            </button>
        </div>
     );
}
 
export default Home;