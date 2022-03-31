const mongoose = require("mongoose");
const Airline = require("../models/Airline");
const Airport = require("../models/Airport");


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
  } catch (err) {   //  Errors handled using a try catch 
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
    } catch (err) {   //  Errors handled using a try catch 
      console.log(err.message);
      res.status(500).json({
        message: "error",
      });
    }
  };
