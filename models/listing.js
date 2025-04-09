const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");

const Schema = new mongoose.Schema({
    title: {
        type : String,
        required: true},
        
    description: String,
    image: {
        filename: { type: String, default: "listingimage" },
        url: { type: String},
    },
    price: Number,
    location: String,
    country : String,
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
})

const listing = mongoose.model("Listing", Schema);

module.exports = listing;