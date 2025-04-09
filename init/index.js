const mongoose = require("mongoose");
const data = require("./data.js");
const listing = require("../models/listing.js");

const mongourl = "mongodb://localhost:27017/wanderlust";

async function main() {
        await mongoose.connect(mongourl);
        // await listing.insertMany(data.data);
}

main().then(() => {
        console.log("Database connected");
}).catch((err) => {
        console.log(err);
})

const initDB = async () => {
        await listing.deleteMany();
        data.data = data.data.map((obj) => ({...obj , owner : '67ecfaac222d92abdb274e6a'}));
        await listing.insertMany(data.data);
        console.log("Database initialized");
}

initDB();