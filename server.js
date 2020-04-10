const express = require('express');

const actionRouter = require('./data/routers/actionRouter.js');
const projectRouter = require('./data/routers/projectRouter.js');

const server = express();
server.use(express.json());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.send("Api Sprint Project");
});

module.exports = server;