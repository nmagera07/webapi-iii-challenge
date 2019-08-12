const express = require('express');

const server = express();

const router = require('./users/userRouter')

server.use(express.json())
server.use(logger)
server.use('/', router)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
    const method = req.method
    const url = req.url
    const timestamp = Date.now()
    console.log(`you made a ${method} request to ${url} at ${timestamp}`)
    next()
};



module.exports = server;
