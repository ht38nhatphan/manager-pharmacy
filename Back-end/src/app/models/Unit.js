const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Unit = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String
  },
},
  { timestamps: true }
);

// add plugin
Unit.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model('unit', Unit)
