const app = require('./src/app')
const connectDB = require('./src/config/ConnectDB')
const http = require('http')
const initSocket = require('./src/services/socket.services')

// connect database 
connectDB()

// connect socket.io
const server = http.createServer(app) // websocket with express HTTP request handling
initSocket(server)


server.listen(5000, ()=> {
    console.log('Socket server is connected');
})