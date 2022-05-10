const express = require("express");
const createServers = require('./apolloConfig/servers')
const app = express();

createServers(app)

app.listen({port: 4001}, () => console.log("http://localhost:4001/login","http://localhost:4001/graphql"))
