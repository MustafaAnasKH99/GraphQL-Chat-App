import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Chat from './Chat'

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  })
);

const Home = () => {
    let _token = localStorage.getItem('token')
    const [ token, setToken ] = useState(_token)

    const classes = useStyles();

    return ( 
        <div>
            <h1>Share your thoughts!</h1>
            <Chat />
            <Button variant="contained" color="secondary" className={classes.button} onClick={() => {
                localStorage.removeItem('token')
                setToken("")
                console.log(token)
            }}>
                Log Out
            </Button>
        </div>
     );
}
 
export default Home;