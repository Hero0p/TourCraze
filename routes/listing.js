const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const listing = require("../models/listing");


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
router.get("/new" , (req , res) => {
    res.render("new.ejs");
})

//create
router.post("/" , wrapAsync( async (req , res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400 , "bad req , send valid data");
    // }
    let result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400 , result.error);
    }
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}))

//show
router.get("/:id" , wrapAsync(async (req , res) => {
    const id = req.params.id;
    const item = await listing.findById(id).populate("reviews");
    res.render("show.ejs" , {item});
}))

router.get("/:id/edit" , wrapAsync(async (req , res) => {
    let {id} = req.params;
    const item = await listing.findById(id);
    res.render("edit.ejs" , {item});
}))

// update
router.put("/:id" , wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400 , "bad req , send valid data");
    }
    let{id} = req.params;
    await listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect("/listings");
}))

//delete
router.delete("/:id" , wrapAsync(async (req , res) => {
    let{id} = req.params;
    let deletedItem = await listing.findByIdAndDelete(id);
    console.log(`Deleted ${deletedItem.title}`)
    res.redirect("/listings");
}))


module.exports = router;