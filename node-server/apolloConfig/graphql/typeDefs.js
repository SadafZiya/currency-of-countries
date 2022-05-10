const {gql} = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getCountries(name: String): [Country]
    signUp(email:String!,password : String! , confirmPassword:String!): Boolean
    logOut: Boolean
    getAllUsers :[loginInfo]
  }
  
  type loginInfo{
    token : String
    email : String     
  }
   
  type Country {
    fullName: String
    population: Int
    currencies: [Currencies]
  } 

  type Currencies {
    currency: String
    name: String
    exchangeRate:Float
  }
   
`
module.exports = typeDefs
