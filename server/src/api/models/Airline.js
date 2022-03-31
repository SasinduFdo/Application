const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const airlineSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    airlineCompanyName: {
      type: String,
      required: true,
      trim: true,
    },
    airlineCode: {
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
    timestamps: false,
  }
);

const Airline = mongoose.model("Airline", airlineSchema);

module.exports = Airline;
