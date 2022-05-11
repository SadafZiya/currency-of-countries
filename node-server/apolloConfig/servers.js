const { ApolloServer } = require("apollo-server-express");
const { checkToken } = require("../query/userQuery");
const {
  resolvers,
  typeDefs,
  typeDefsLogin,
  resolversLogin,
} = require("./index");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { rateLimitDirective } = require("graphql-rate-limit-directive");
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
  rateLimitDirective({
    defaultLimit: 30,
    defaultDuration: 60,
  });

const createServers = (app) => {
  const serverGraphql = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      let user = await checkToken(req);
      return { user };
    },
  });

  const serverLogin = new ApolloServer({
    schema: rateLimitDirectiveTransformer(
      makeExecutableSchema({
        typeDefs: [rateLimitDirectiveTypeDefs, typeDefsLogin],
        resolvers: resolversLogin,
      })
    ),
  });

  serverGraphql.applyMiddleware({ app });
  serverLogin.applyMiddleware({
    app,
    path: "/login",
  });
};

module.exports = createServers;
