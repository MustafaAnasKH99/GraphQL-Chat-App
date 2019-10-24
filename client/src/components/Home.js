import React, { Component, useState } from 'react'
import Chat from './Chat'


const Home = () => {
    let _token = localStorage.getItem('token')
    const [ token, setToken ] = useState(_token)

    return ( 
        <div>
            <h1>Share your thoughts!</h1>
            <button style={{padding:  '5px', margin: '5px'}} onClick={() => {
                localStorage.removeItem('token')
                setToken("")
            }}>Log Out</button>
            <Chat />
        </div>
     );
}
 
export default Home;