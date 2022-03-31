const http = require('http');
const app = require('./app');
require('dotenv').config();


const server = http.createServer(app);  // Creating the server using the http library 

server.listen(process.env.SERVER_PORT,()=> // Creating an open port for the client requests using the port given in the .env file
{
    console.log("Server Started on PORT " + process.env.SERVER_PORT );
});