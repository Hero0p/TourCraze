const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const review = require("./models/review");
// const {reviewSchema} = require("./schema.js")

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const port = 3000;

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
// app.set(express.static(path.join(__dirname) , "public"));

async function main(){
        await mongoose.connect('mongodb://localhost:27017/wanderlust');
}

main().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
})

app.get("/" , (req , res) => {
    res.send("working");
})

app.get("/" , (req , res) => {
    res.send("working");
})

app.use("/listings" , listings);

app.use("/listings/:id/reviews" , reviews);







app.all("*",(req , res , next) => {
    next ( new ExpressError(404 , "page not found"));
});

app.use((err , req , res , next) => {
    let{statusCode , msg} = err;
    res.render("error.ejs" , {msg : "something went wrong"});
    // res.status(statusCode).send(msg)
    // res.send("something went wrong")
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
