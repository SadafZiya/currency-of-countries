const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const typeDefsLogin = require("./login/typeDefsLogin");
const resolversLogin = require("./login/resolversLogin");

module.exports = { typeDefs, resolvers, typeDefsLogin, resolversLogin };
