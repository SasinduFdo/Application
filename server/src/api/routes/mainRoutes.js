const router = require("express").Router();
const Controller = require("../controllers/mainController");
const Authentication = require("../middleware/Authentication");

router.get("/viewAirline", Authentication, Controller.view_airline_data); // Sends all the airlines in the database
router.get("/viewAirport", Authentication, Controller.view_airport_data); // Sends all the airports in the database
router.get("/viewFlight", Authentication, Controller.view_flight_data); // Sends all the flights in the database
router.get("/viewPassengersByFlight", Authentication, Controller.get_passengers_by_flight); // Sends passenger details by flight
router.get("/viewRiskData", Authentication, Controller.get_risk_data); // Sends all the risk data
router.post("/register", Authentication, Controller.register_user); // Register user
router.post("/login", Controller.login); //  User login
module.exports = router;
