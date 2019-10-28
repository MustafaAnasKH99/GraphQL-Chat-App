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

import NewMessage from './NewMessage'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      color: 'black',
    },

    paper: {
        maxHeight: 400,
        height: '100%',
        width: '100%',
        overflow: 'auto'
    },

    hideScrollBar: {
        overflow: 'hidden',
        height: '100%',
        width: '100%'
    }
}));

const Message = ({ chatId }) => {
    const { loading, error, data, refetch } = useQuery(MESSAGES,{
        variables: { chatId },
        onCompleted: () => toast('Messages loaded')
    });
    
    const classes = useStyles();

    if (loading) return <CircularProgress />;
    if (error) return `Error! ${error.message}`;


    return ( 
        <div>
            <Paper className={classes.hideScrollBar}>
                <List className={classes.root} className={classes.paper}>
                    {
                        data.fetchMessagesByChatId.map((e) => {
                            return (
                                <ListItem>
                                    <ListItemText primary={e.content} secondary={e.ownerId.name} />
                                </ListItem>
                            ) 
                        })
                    }
                </List>
                <CreateMessage chatId={chatId} refetch={refetch} className={classes.root} />
            </Paper>
            <NewMessage />
        </div>
     );
}
 
export default Message;