const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const riskModelSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    riskModelRiskData: {
      type: Object,
      required: true,
    },
    riskModelPassengerData: {
      type: Object,
      required: true,
    },
    riskModelFlightData: {
      type: Object,
      required: true,
    },
    riskModelArrivalAirport: {
      type: Object,
      required: true,
    },
    riskModelDepartureAirport: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RiskModel = mongoose.model("RiskModel", riskModelSchema);

module.exports = RiskModel;
