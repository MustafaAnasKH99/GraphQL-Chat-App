const { ApolloError } = require('apollo-server');
const Message = require('./model');
const Helpers = require('../helpers');

// Create Message
exports.createMessage = async (_, params, context) => {
        // await Helpers.checkSuperAdmin(context);
    return new Promise((resolve, reject) => {
        const { content, chatId, ownerId } = params
        const message = {
            chatId: chatId,
            // ownerId: context.user.id,
            ownerId: ownerId,
            content: content
        };

        // Create new Message
        const newMessage = new Message(message);
        newMessage.save()

        // Resolve New Message
        resolve(message);
    })
}

// Fetch Message/s
exports.fetchMessagesByOwner = async (params) => {
    return new Promise((resolve, reject) => {
        School.find({ownerId: params.ownerId}, (err, message) => {
            resolve(message)
        }).populate('ownerId')
          .populate('chatId')
    })
}

exports.fetchMessages = async (context) => {
    return new Promise((resolve, reject) => {
        Message.find({}, (err, message) => {
            resolve(message)
        }).populate('ownerId')
          .populate('chatId')
          .populate({
            path: 'chatId',
            populate: {
              path: 'users'
          }})
    })
}


exports.fetchMessagesByChatId = async (params, context) => {
    return new Promise((resolve, reject) => {
        Message.find({chatId: params.chatId}, (err, message) => {
            resolve(message)
        }).populate('ownerId')
          .populate('chatId')
          .populate({
            path: 'chatId',
            populate: {
              path: 'users'
          }})
    })
}

// Delete Message
exports.deleteMessage = async (id, context) => {
    // await Helpers.checkSuperAdmin(context);
    return new Promise((resolve, reject) => {
        // if (!id) { reject(new ApolloError("Cannot delete entry.")) };
        Message.findByIdAndRemove({_id: id}, (err, event) => {
        resolve(event, 'Message deleted successfully')
    }).exec()
    });
}
