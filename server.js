const express = 'express';

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

server.listen(8009, () => {
  console.log('api up on the port')
})

module.exports = server;
