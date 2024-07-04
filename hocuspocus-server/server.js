const { Server } = require('@hocuspocus/server')
const { Logger } = require ("@hocuspocus/extension-logger")

const server = Server.configure({
  port: 1234, // Specify the port for the Hocuspocus server
  extensions: [new Logger()],
})

server.listen()
console.log('Hocuspocus server is running on port 1234')

