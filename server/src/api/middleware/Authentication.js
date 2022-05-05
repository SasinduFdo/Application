  const jwt = require('jsonwebtoken');
  const fetch = require('node-fetch');
  const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;                         
        const decoded = jwt.verify(token, process.env.JWT_KEY);  //Decrypting the JWT to verify the request 
        req.userData = decoded;
        console.log("system accessed");  // Storing the decoded data in the request
        next(); // Passing the request to the controller
    } catch (error) { // jwt.verify will throw an error, Therefore, response will send the following message 
        console.log("login");
        return res.status(200).json({
            message: 'login' //Sending a login error message
        });
    }
};