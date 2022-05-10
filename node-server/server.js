const express = require("express");
const createServers = require('./apolloConfig/servers')
const app = express();

createServers(app)

app.listen({port: 4000}, () => console.log("http://localhost:4000/login","http://localhost:4000/graphql"))
