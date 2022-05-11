const { gql } = require("apollo-server-express");

const typeDefsLogin = gql`
  type Query @rateLimit {
    login(email: String!, password: String!): loginInfo @rateLimit
  }

  type loginInfo {
    token: String
    email: String
  }
`;
module.exports = typeDefsLogin;
