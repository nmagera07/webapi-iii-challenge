// code away!
const server = require('./server')



const port = 8009

server.listen(port, () => {
    console.log(`api running on port ${port}`)
})