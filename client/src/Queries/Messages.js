import gql from 'graphql-tag'

const MESSAGES = gql`
    query fetchMessagesByChatId($chatId: String!) {
        fetchMessagesByChatId(chatId: $chatId){
            id
            content
            ownerId{
              name
            }
          }
    }
`

export default MESSAGES