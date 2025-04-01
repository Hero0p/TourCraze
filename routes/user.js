const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
// const review = require('../models/review');

router.get("/signup" , (req , res) => {
    res.render("signup.ejs");
})

// router.post("/signup" , async (req , res) => {
//     let {username , email , password} = req.body;
//     const newUser = new User(email , username);
//     const registeredUser = await User.register(newUser , password);
//     res.redirect("/listings");
// })

module.exports = router;