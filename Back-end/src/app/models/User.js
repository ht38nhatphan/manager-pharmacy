const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const { TRUE } = require("node-sass");
const mongooseDelete = require("mongoose-delete");

const User = new Schema({
  username: {
    type: String,
    // required: true,
    unique: true
  },
  email: {
    type: String,
    // required: true,
    minlength: 10,
    maxlength: 50,
    unique: true
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    // required: true,
    minlength: 6
  },
  admin: {
    type: Boolean,
    default: false,
  },
},
  { timestamps: true }
);

// add plugin
User.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model('users', User)