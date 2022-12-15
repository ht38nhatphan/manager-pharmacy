const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const { TRUE } = require('node-sass');
mongoose.plugin(slug);
const Order = new Schema({
    // userId: { type: String, required: true },
    idorder: { type: String, required: true },
    products: {
        productsindex: {
            productId: {
                type: String,
            },
            idbrand: { type: String },
            brand: { type: String },
            amount: {
                type: Number,
                default: 1
            },
            priceOut: { type: Number },
            sumprice: { type: Number },
        }
    },
    sumorder: { type: Number },
    address: { type: String },
    status: { type: String, default: "pending" },
    dateorder: { type: Date, default: Date.now },
},
    { timestamps: true },
);


module.exports = mongoose.model("Order", Order);
