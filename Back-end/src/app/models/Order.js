const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const { TRUE } = require('node-sass');
mongoose.plugin(slug);
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Bangkok").format();
var utcDate = moment.utc().toDate();
console.log(dateVietNam);
const Order = new Schema({
    userId: { type: String, required: true },
    idorder: { type: String, required: true },
    key: { type: Number },
    products: [{
        productId: {
            type: String, required: true
        },

        idbrand: { type: String },
        name: { type: String },
        amount: {
            type: Number,
            default: 1
        },
        priceOut: { type: Number },
        sumprice: { type: Number },
        priceIn: { type: Number },
        sumpriceIn: { type: Number },
    },]
    ,
    sumorderin: { type: Number },
    sumorder: { type: Number, required: true },
    address: { type: String },
    namecustomer: { type: String },
    status: { type: String, default: "pending" },
    dateorder: { type: Date, default: dateVietNam },
},
    { timestamps: true },
);


module.exports = mongoose.model("Order", Order);
