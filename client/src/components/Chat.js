import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import Message from './Message'

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
                    })
                }
                <Message chatId={data.fetchAllChats[0].id} />
            </div>
        )
    }
}
 
export default Chat;