const ExpressError = require("./utils/ExpressError.js");
const listing = require("./models/listing.js");
const Review = require("./models/review");




module.exports.isLoggedIn = (req , res, next) => {
    if(!req.isAuthenticated()){
        res.redirect("/login");

    }
    next();
}

module.exports.isOwner = async (req , res , next) => {
    let{id} = req.params;
    let item = await listing.findById(id);
    if(currUser && !item.owner.equals(currUser._id)){
        res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req , res , next) => {
    let{id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        res.redirect(`/listings/${id}`);
    }
    next();
}