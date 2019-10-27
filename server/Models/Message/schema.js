const { gql } = require('apollo-server-express');
const Message = require('./schema')

const schema = gql`
   type Message {
        id: String
        chatId: Chat
        ownerId: User
        content: String
    }
   input MessageInput {
        chatId: String
        ownerId: String
        content: String
   }

   type Mutation {
        createMessage(params: MessageInput): Message
        deleteMessage(id: String!): Message
   }
   type Query {
        fetchMessages: [Message]
        fetchMessagesByOwner(ownerId: String!): [Message]
        fetchMessagesByChatId(chatId: String!): [Message]
   }

   type Subscription {
     newMessage: Message
   }
`;

module.exports = schema;