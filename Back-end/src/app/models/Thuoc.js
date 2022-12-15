const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const { TRUE } = require("node-sass");
const mongooseDelete = require("mongoose-delete");

const Thuoc = new Schema({
  brand: { type: String, required: true },
  idbrand: { type: String, required: true },
  name: { type: String, required: true },
  priceIn: { type: Number, required: true },
  priceOut: { type: Number, required: true },
  support: { type: String, required: true },
  dosageForm: { type: String },
  specification: { type: String },
  mainPrice: { type: String },
  brandCountry: { type: String },
  producer: { type: String },
  categories: { type: Array },
  category: { type: String },
  amount: { type: Number },
  uses: { type: String },
  Images: { type: Array },
  exp: { type: Date, required: true },
  slug: { type: String, slug: "name", unique: TRUE },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
// add plugin
mongoose.plugin(slug);
Thuoc.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Thuoc", Thuoc);
