import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { List, ListItem, ListItemText, Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import CreateMessage from './CreateMessage'

import MESSAGES from '../Queries/Messages'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      color: 'black',
    },

    paper: {
        maxHeight: 400,
        overflow: 'auto'
    }
}));

const Message = ({ chatId }) => {
    const { loading, error, data, refetch } = useQuery(MESSAGES,{
        variables: { chatId },
    });
    
    let history = useHistory()
    const classes = useStyles();

    if (loading) return <CircularProgress />;
    if (error) return `Error! ${error.message}`;


    return ( 
        <div>
            <Paper className={classes.paper}>
                <List className={classes.root}>
                    {
                        data.fetchMessagesByChatId.map((e) => {
                            console.log(e.content)
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
        </div>
     );
}
 
export default Message;