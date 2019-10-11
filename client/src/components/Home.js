import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
    let history = useHistory()
    return ( 
        <div>
            <h1>Welcome Home!</h1>
            <button onClick={() => {
                history.push('/signin')
            }}>Join Us!
            </button>
        </div>
     );
}
 
export default Home;