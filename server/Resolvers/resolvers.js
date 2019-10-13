/**
 * Apollo Server Boilerplate, released under MIT license.
 * Created by Mohamad Kaakati
 * Email: m@kaakati.me
 * This software is provided as is.
 * 2019
 */

const { ApolloError, PubSub } = require('apollo-server');
const Database = require('../Database/db');
const Methods = require('./imports'); // Mongoose Models Imports
const pubsub = new PubSub();

// Connect to Database
Database.connectToDB()

const DEMO_LOGGEDIN = 'DEMO_LOGGEDIN';

const resolvers = {
    Subscription: {
        demoSubscription: {
            subscribe: () => pubsub.asyncIterator([DEMO_LOGGEDIN]),
        },
    },
    Query: {
        // User.
        fetchCurrentUser: async (rootValue, input, context) => {
            // Subscription Notification for Real-Time
            pubsub.publish(DEMO_LOGGEDIN, { demoSubscription: Methods.UserMethods.fetchCurrentUser(context) });
            // Query Method
            return await Methods.UserMethods.fetchCurrentUser(context);
        },
        fetchAllUsers: async () => {
            return await Methods.User.fetchAllUsers();
        },

        // Messages
        fetchMessages: async (context) => {
            return await Methods.Message.fetchMessages(context)
        },
        fetchMessagesByOwner: async (params, context) => {
            return await Methods.Message.fetchMessagesByOwner(params, context)
        },
        fetchMessagesByChatId: async (_, params, context) => {
            return await Methods.Message.fetchMessagesByChatId(params, context)
        },
    },
    Mutation: {
        // User.
        loginUser: async (_, {params}, context) => {
            console.log('params', params);
            return await Methods.User.loginUser(params);
        },
        createUser: async (_, {params}, context) => {
            return await Methods.User.createNewUser(params);
        },

        // Messages
        createMessage: async (_, {params}, context) => {
            return await Methods.Message.createMessage(_, params, context)
        },
        deleteMessage: async (_, {id}, context) => {
            return await Methods.Message.deleteMessage(id)
        },
    },
};

module.exports = resolvers;