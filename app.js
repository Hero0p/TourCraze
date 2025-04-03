const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const port = 3000;

const sessionOptions = {
    secret : "somethingsecret" ,
    resave : false ,
    saveUninitialized : true ,
    cookie : {
        expires : true,
        maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



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

app.use("/" , userRouter);

app.use("/listings" , listings);

app.use("/listings/:id/reviews" , reviews);

// app.use("/signup" , user);





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
