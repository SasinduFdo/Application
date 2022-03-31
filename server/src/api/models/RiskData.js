const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const riskDataSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    riskDataForename: {
      type: String,
      required: true,
      trim: true,
    },
    riskDataFamilyName: {
      type: String,
      required: true,
      trim: true,
    },
    riskDataGender: {
      type: String,
      required: true,
      trim: true,
    },
    riskDataDOB: {
      type: String,
      required: true,
      trim: true,
    },
    riskDataNationality: {
      type: String,
      required: true,
      trim: true,
    },
    riskDataPassportNumber: {
      type: String,
      required: true,
      trim: true,
    },
    riskFactors: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RiskData = mongoose.model("RiskData", riskDataSchema);

module.exports = RiskData;
