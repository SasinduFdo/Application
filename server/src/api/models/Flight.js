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
    flightArrival: {
      type: String,
      required: true,
      trim: true,
    },
    flightTerminal: {
      type: String,
      required: true,
      trim: true,
    },
    flightAircraft: {
      type: String,
      required: true,
      trim: true,
    },
    flightCapacity: {
      type: String,
      required: true,
      trim: true,
    },
    flightCrewNumber: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
