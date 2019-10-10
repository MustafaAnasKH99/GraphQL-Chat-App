import gql from 'graphql-tag';


const LOGIN_USER = gql`
    mutation LoginUser($mobile: String!, $password: String!){
        loginUser(parms: {
            mobile: $mobile, 
            password: $password
        })
    }

`

export default LOGIN_USER