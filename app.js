const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

app.get("/listings" , async (req , res) => {
    const allListings = await listing.find();
    res.render("listings.ejs" , {allListings});
})

app.get("/listings/new" , (req , res) => {
    res.render("new.ejs");
})

//create
app.post("/listings" , async (req , res) => {
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

app.get("/listings/:id" , async (req , res) => {
    const id = req.params.id;
    const item = await listing.findById(id);
    res.render("show.ejs" , {item});
})

app.get("/listings/:id/edit" , async (req , res) => {
    let {id} = req.params;
    const item = await listing.findById(id);
    res.render("edit.ejs" , {item});
})

// update
app.put("/listings/:id" , async (req, res) => {
    let{id} = req.params;
    await listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect("/listings");
})

//delete
app.delete("/listings/:id" , async (req , res) => {
    let{id} = req.params;
    let deletedItem = await listing.findByIdAndDelete(id);
    console.log(`Deleted ${deletedItem.title}`)
    res.redirect("/listings");
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
