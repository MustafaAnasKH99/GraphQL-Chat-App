import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import chats from '../Queries/Chats'

const Chat = () => {
    let history = useHistory()
    const { loading, data} = useQuery(chats)

    if(loading){
        return (
            <CircularProgress />
        )
    } else {
        return (
            <div>
                {
                    data.fetchAllChats[0].users.map(e => {
                        console.log(e.name)
                        return <h1>{e.name}</h1>
                    })
                }
            </div>
        )
    }
}
 
export default Chat;