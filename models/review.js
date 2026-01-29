const mongoose = require("mongoose");
const User = require("./user.js");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        max: 5,
        min: 1
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    author : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
});

module.exports = mongoose.model("Review", reviewSchema);
