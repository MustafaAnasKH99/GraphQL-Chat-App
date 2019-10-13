const { ApolloError } = require('apollo-server');
const Chat = require('./model');
const Helpers = require('../helpers');

// Create Chat
exports.createChat = async (params,context) => {
    // await Helpers.checkSuperAdmin(context);
    return new Promise((resolve, reject) => {
        const { users } = params
        const chat = {
            users: users
        };

        // Create new Chat
        const newChat = new Chat(chat);
        newChat.save()

        // Resolve New Chat
        resolve(chat);
    })
}


// Fetch Chat By User only
exports.fetchChats = async (_, context) => {
    return new Promise((resolve, reject) => {
        console.log('Fetching chats work')
        Chat.find({users: {$in: context.user.id}}, (err, chat) => {
            if (chat == null){
                resolve('{}')
                console.log('CHAT IS NULL')
            }
            resolve(chat)
        }).populate('users')
    })
}

// Fetch All Chats
exports.fetchAllChats = async (_, context) => {
    return new Promise((resolve, reject) => {
        Chat.find({}, (err, chat) => {
            resolve(chat)
        }).populate('users')
    })
}

exports.fetchChatsByTwoUsers = async (context, params) => {
    return new Promise((resolve, reject) => {
        Chat.find({
            $and: [
                {users: {$in: context.user.id}},
                {users: {$in: params.id}},
            ]
        }, (err, chat) => {
            if (chat == null){
                resolve('{}')
                console.log('CHAT IS NULL')
            }
            resolve(chat)
        }).populate('users')
    })
}

//delete class room
exports.deleteChat = async function(id, context) {
    // await Helpers.checkSuperAdmin(context);

    return new Promise((resolve, reject) => {
        if (!id) { reject(new ApolloError("Cannot delete entry.")) };
        Chat.findByIdAndDelete(id, (err, chat) => {
        resolve(chat, 'deleted successfully')
    }).exec()
    });
}