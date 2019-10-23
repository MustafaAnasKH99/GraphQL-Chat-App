import gql from 'graphql-tag';


const CREATE_MESSAGE = gql`
    mutation createMessage($chatId: String!, $content: String!, $ownerId: String!){
        createMessage(params: {
          chatId: $chatId,
          content: $content,
          ownerId: $ownerId
        }){
          content
        }
      }

`

export default CREATE_MESSAGE