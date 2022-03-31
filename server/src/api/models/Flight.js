const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    flightNumber: {
      type: String,
      required: true,
      trim: true,
    },
    flightDeparture: {
      type: String,
      required: true,
      trim: true,
    },
    airlineCountry: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
