const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passengerSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    passengerFlight: {
      type: String,
      required: true,
      trim: true,
    },
    passengerSeatNumber: {
      type: String,
      required: true,
      trim: true,
    },
    passengerForeName: {
      type: String,
      required: true,
      trim: true,
    },
    passengerFamilyName: {
        type: String,
        required: true,
        trim: true,
      },
      passengerPassportNumber: {
        type: String,
        required: true,
        trim: true,
      },
      passengerCountry: {
        type: String,
        required: true,
        trim: true,
      }
  },
  {
    timestamps: true,
  }
);

const Passenger = mongoose.model("Passenger", passengerSchema);

module.exports = Passenger;
