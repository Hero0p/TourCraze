const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const passport = require('passport')
// const review = require('../models/review');

router.get("/signup" , (req , res) => {
    res.render("signup.ejs");
})

router.post("/signup" , async (req , res) => {
    let {username , email , password} = req.body;
    const newUser = new User({email , username});
    const registeredUser = await User.register(newUser , password);
    console.log(registeredUser);
    res.redirect("/listings");
})

//login
router.get("/login" , (req , res) => {
    res.render("login.ejs");
})

router.post("/login" , passport.authenticate("local", {failureRedirect : "/login" , failureFlash : true}) , async (req , res) => {
    res.redirect("/listings");
})

//logout

router.get("/logout" , (req , res) => {
    req.logout((err) => {
        if(err) next();
        res.redirect("/listings");
    })
})

module.exports = router;