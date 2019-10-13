const { gql } = require('apollo-server-express');
const Chat = require('./schema')

const schema = gql`
   type Chat {
        id: String
        users: [User]
    }
   input ChatInput {
        users: [String]
   }
   type Mutation {
        createChat(params: ChatInput): Chat
        deleteChat(id: String!): String!
   }
   type Query {
        fetchChats: [Chat]
        fetchChatsByTwoUsers(id: String): [Chat]
        fetchAllChats: [Chat]
   }
`;

module.exports = schema;