const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Branch = new Schema({
  idbranch: { type: String, required: true },
  namebranch: { type: String },
  nameuserbranch: { type: String },
  stattus: { type: String },
  adress: { type: String },
},
  { timestamps: true },
);


module.exports = mongoose.model("Branch", Branch);
