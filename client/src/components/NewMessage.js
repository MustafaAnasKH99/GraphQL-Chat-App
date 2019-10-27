import React, { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core'
import { List, ListItem, ListItemText, Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import CreateMessage from './CreateMessage'

import MESSAGES from '../Queries/Messages'
import NEW_MESSAGE from '../Subscriptions/NewMessage'
import { toast } from 'react-toastify';

const NewMessage = () => {
    const { data, loading, error } = useSubscription(
        NEW_MESSAGE,
    )

    if (error) toast('ERROR')
    if (loading) toast('loading')
    if (!loading) console.log(data)
    if (data) console.log(data)

    return ( 
        <div>
            <h4>New comment: {!loading && data.newMessage}</h4>;
        </div>
     );
}
 
export default NewMessage;