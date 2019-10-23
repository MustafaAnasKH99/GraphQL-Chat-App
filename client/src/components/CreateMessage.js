import React, { useState } from 'react'

// Material UI
import { Input, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Apollo
import { useMutation } from '@apollo/react-hooks';
import CREATE_MESSAGE from '../Mutations/createMessage'

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
  

const CreateMessage = ({refetch, chatId}) => {
    const classes = useStyles();
    const [ message, setMessage ] = useState('')

    const [ createMessage ] = useMutation(
    CREATE_MESSAGE,
    {
        onCompleted: data => {
        const { createMessage } = data
            console.log(createMessage)
        }
    }
    )

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        await createMessage({ 
            variables: { chatId: chatId, content: message },
        })
        refetch()
        setMessage('')
    }

    return ( 
        <div>
            <Input onChange={(e) => handleChange(e)} className="Mui-focused MuiInput-fullWidth" placeholder="Say something" color="white"/>
            <Button onClick={(e) => handleSubmit(e)} className={classes.button} color="primary" variant="contained">
                Send!
            </Button>
        </div>
     );
}
 
export default CreateMessage;