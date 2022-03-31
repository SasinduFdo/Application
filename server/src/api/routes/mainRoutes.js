const router = require('express').Router();
const Controller = require("../controllers/mainController")

router.get('/viewAirline', Controller.view_airline_data);
router.get('/viewAirport', Controller.view_airport_data);


module.exports = router;