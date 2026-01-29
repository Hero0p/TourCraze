const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const listing = require("../models/listing");
const {isLoggedIn} = require("../middleware.js")


const validateListing = (req , res, next) => {

    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400 , error);
    }else{
        next();
    }
}


//index
router.get("/" , wrapAsync(async (req , res) => {
    const allListings = await listing.find();
    res.render("listings.ejs" , {allListings});
}))

//create
router.get("/new" ,isLoggedIn , (req , res) => {
    // if(!req.isAuthenticated()){
    //     res.redirect("/login");

    // }
    res.render("new.ejs");
})

//create
router.post("/" , isLoggedIn , wrapAsync( async (req , res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400 , "bad req , send valid data");
    // }
    let result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400 , result.error);
    }
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    res.flash("success" , "New Listing Created")
    res.redirect("/listings");
}))

//show
router.get("/:id" , wrapAsync(async (req , res) => {
    const id = req.params.id;
    const item = await listing.findById(id).populate({path :"reviews" , populate : {path : "author"},}).populate("owner");
    console.log(item);
    res.render("show.ejs" , {item});
}))

router.get("/:id/edit" , isLoggedIn , wrapAsync(async (req , res) => {
    let {id} = req.params;
    const item = await listing.findById(id);
    res.render("edit.ejs" , {item});
}))

// update
router.put("/:id" , isLoggedIn ,wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400 , "bad req , send valid data");
    }
    let{id} = req.params;
    let item = await listing.findById(id);
    if(!currUser && !item.owner.equals(currUser._id)){
        res.redirect(`/listings/${id}`);
    }
    await listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect("/listings");
}))

//delete
router.delete("/:id" , isLoggedIn , wrapAsync(async (req , res) => {
    let{id} = req.params;
    let deletedItem = await listing.findByIdAndDelete(id);
    console.log(`Deleted ${deletedItem.title}`)
    res.redirect("/listings");
}))


module.exports = router;