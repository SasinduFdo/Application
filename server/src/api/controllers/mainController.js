const mongoose = require("mongoose");
const Airline = require("../models/Airline");
const Airport = require("../models/Airport");
const Flight = require("../models/Flight");
const Passenger = require("../models/Passenger");
const RiskModel = require("../models/RiskModel");
const RiskData = require("../models/RiskData");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
//View airline data function
exports.view_airline_data = (req, res, next) => {
  try {
    //Fetching the airline data using the mongo model
    Airline.find()
      .exec()
      .then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          message: "error",
        });
      });
  } catch (err) {
    //  Errors handled using a try catch
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};

//View airport data function
exports.view_airport_data = (req, res, next) => {
  try {
    //Fetching the airport data using the mongo db model
    Airport.find()
      .exec()
      .then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          message: "error",
        });
      });
  } catch (err) {
    //Errors handled using a try catch
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};

//View flight data function
exports.view_flight_data = (req, res, next) => {
  try {
    //Fetching the airport data using the mongo db model
    Flight.find()
      .exec()
      .then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          message: "error",
        });
      });
  } catch (err) {
    //Errors handled using a try catch
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};

//get Passenger list for particular flight
exports.get_passengers_by_flight = (req, res, next) => {
  try {
    console.log(req.query.id);
    if (req.body._id !== null) {
      let flightId = req.query.id;
      Passenger.find({ passengerFlight: flightId })
        .exec()
        .then((doc) => {
          console.log(doc);
          res.status(200).json(doc);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "error",
          });
        });
    } else {
      res.status(500).json({
        message: "error",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
};

//get Risk Data
exports.get_risk_data = async (req, res, next) => {
  try {
      let NewRiskDataModelList = [];

      //creating the new risk data model
      let risks = [];
      await RiskData.find()
        .exec()
        .then((doc) => {
          risks = doc;
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({
            message: "error",
          });
        });

      for (let a = 0; a < risks.length; a++) {
        let riskModelPassengerData = [];
        let riskModelFlightData = [];
        let riskArrAirport = [];
        let riskDepAirport = [];

        await Passenger.find({
          passengerPassportNumber: risks[a].riskDataPassportNumber,
        })
          .exec()
          .then((mypassenger) => {
            riskModelPassengerData[0] = mypassenger[0];
            console.log(mypassenger);
          })
          .catch((err) => {
            console.log(err.message);
            res.status(500).json({
              message: "error",
            });
          });

        await Flight.find({
          flightNumber: riskModelPassengerData[0].passengerFlight,
        })
          .exec()
          .then((flight) => {
            riskModelFlightData[0] = flight[0];
          })
          .catch((err) => {
            console.log(err.message);
            res.status(500).json({
              message: "error",
            });
          });

        await Airport.find({
          airportIATACode: riskModelFlightData[0].flightArrival,
        })
          .exec()
          .then((airport) => {
            riskArrAirport[0] = airport[0];
          })
          .catch((err) => {
            console.log(err.message);
            res.status(500).json({
              message: "error",
            });
          });

        await Airport.find({
          airportIATACode: riskModelFlightData[0].flightDeparture,
        })
          .exec()
          .then((airport) => {
            console.log(airport);
            riskDepAirport[0] = airport[0];
          })
          .catch((err) => {
            console.log(err.message);
            res.status(500).json({
              message: "error",
            });
          });

        let newRiskModel = new RiskModel({
          _id: new mongoose.Types.ObjectId(),
          riskModelRiskData: risks[a],
          riskModelPassengerData: riskModelPassengerData[0],
          riskModelFlightData: riskModelFlightData[0],
          riskModelArrivalAirport: riskArrAirport[0],
          riskModelDepartureAirport: riskDepAirport[0],
        });

        NewRiskDataModelList.push(newRiskModel);
      }

      res.status(200).json(NewRiskDataModelList);
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};

exports.register_user = (req, res, next) => {
  console.log(req.body);

   User.find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length == 0) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              console.log(err.message);
              res.status(500).json({
                message: "error",
              });
            } else {
              //creating an user object
              let user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
              });
              //saving the user
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(200).json({ message: "saved" });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(500).json({
                    message: "error",
                  });
                });
            }
          });
        }
        if (user.length == 1) {
          res.status(200).json({
            message: "username taken",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          message: "error",
        });
      });


  

};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body)
    await User.find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length == 0) {
          console.log("invalid");
          res.status(500).json({
            message: "invalid",
          });
          return;
        }
        if (user.length == 1) {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "error",
              });
            }

            if (result) {
              const token = jwt.sign(
                {
                  username: user[0].username,
                  userId: user[0]._id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "356days",
                }
              );
              res.status(200).json({
                message: "successful",
                username: user[0].username,
                accessToken: token,
              });
            } else if (!result) {
              console.log("invalid");
              res.status(500).json({
                message: "invalid",
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          message: "error",
        });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};
