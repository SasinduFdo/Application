const router = require('express').Router();
const Controller = require("../controllers/mainController")

router.get('/viewAirline', Controller.view_airline_data); // Sends all the airlines in the database
router.get('/viewAirport', Controller.view_airport_data);  // Sends all the airports in the database 
router.get('/viewFlight', Controller.view_flight_data);  // Sends all the flights in the database 
router.get('/viewPassengersByFlight', Controller.get_passengers_by_flight);  // Sends passenger details by flight
router.get('/viewRiskData', Controller.get_risk_data);  // Sends all the risk data
router.post('/register', Controller.register_user);  // Register user
router.post('/login', Controller.login);  //  User login
module.exports = router;