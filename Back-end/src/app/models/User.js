const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const { TRUE } = require('node-sass');

mongoose.plugin(slug);

const User = new Schema({
  username: {
    type : String,
    required: true,
    unique: true
  },
  email:{
    type : String,
    required: true,
    minlength: 10,
    maxlength: 50,
    unique: true
  },
  password:{
    type : String,
    required: true,
    minlength: 6
  },
  admin:{ type:Boolean, 
  default: false,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('users', User)
