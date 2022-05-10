const {gql} = require("apollo-server-express");

const typeDefsLogin = gql`
 directive @rateLimit(
    max: Int
    window: String
    message: String
    identityArgs: [String]
    arrayLengthField: String
  ) on FIELD_DEFINITION
  
  type Query { 
    login(email:String!,password : String!) :loginInfo @rateLimit(window: "2s", max: 2)
  }
    
  type loginInfo{
    token : String
    email : String     
   }
   
`
module.exports = typeDefsLogin
