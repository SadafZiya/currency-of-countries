const {ApolloServer} = require("apollo-server-express");
const {checkToken} = require("../query/userQuery")
const {resolvers, typeDefs, typeDefsLogin, resolversLogin} = require('./index')
const rateLimitDirective = require('./redisConfig')

const createServers = (app) => {
    const serverGraphql = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({req}) => {
            let user = await checkToken(req)
            return {user}
        },
    });

    const serverLogin = new ApolloServer({
        typeDefs: typeDefsLogin,
        resolvers: resolversLogin,
        schemaDirectives: {
            rateLimit: rateLimitDirective
        }
    });

    serverGraphql.applyMiddleware({app});
    serverLogin.applyMiddleware({
        app,
        path: '/login'
    })
}

module.exports = createServers
