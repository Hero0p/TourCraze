const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const review = require("../models/review");
const listing = require("../models/listing");



// const validateReview = (req , res, next) => {

//     let {error} = listingSchema.validate(req.body);
//     if(error){
//         throw new ExpressError(400 , error);
//     }else{
//         next();
//     }
// }

//reviews
router.post("/" , async (req , res) => {
    let item = await listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    item.reviews.push(newReview);

    await newReview.save();
    await item.save();

    console.log("New Review Saved");
    res.redirect(`/listings/${req.params.id}`);
});

//delete Reviews

router.delete("/:reviewId" , async (req , res) => {
    let {id , reviewId} = req.params;
    await listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await review.findById(reviewId);

    res.redirect(`/listings/${id}`);
})


module.exports = router;