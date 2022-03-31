const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const airportSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    airportIATACode: {
      type: String,
      required: true,
      trim: true,
    },
    airportISOCode: {
      type: String,
      required: true,
      trim: true,
    },
    airportName: {
      type: String,
      required: true,
      trim: true,
    },
    airportLocation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Airport = mongoose.model("Airport", airportSchema);

module.exports = Airport;
