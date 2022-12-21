const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Category = new Schema({
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
Category.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model('categories', Category)
