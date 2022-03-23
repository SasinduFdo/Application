  const jwt = require('jsonwebtoken');
  const fetch = require('node-fetch');
  const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(200).json({
            message: 'login'
        });
    }
};