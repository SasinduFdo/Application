const express = require('express');
const app =  express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

//Connecting to the database
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.error(error));



  
//Creating the Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


//API Origin access - Adding the response e headers so the client browser will not throw any origin access errors                                              
app.use((req, res, next) =>
{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header',
    'Origin , X-Requested, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Importing the routes 
const MainRoute = require("./src/api/routes/mainRoutes")


app.use("/server", MainRoute);

//Error Handling
app.use((req, res, next) => // If the client send a request to an unknown route, server will send the following error 
{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})


//If the server throws any other errors, it will be sent to the client  
app.use((error,req, res, next) =>
{
    res.status(error.status || 500);
    res.json(
        {
            error:
                {
                    message: error.message
                }
        });
});

module.exports = app;