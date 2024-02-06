const express = require("express");
const app = express();
const mainRouter = require("./routes/index.js")
app.use(express.json());


const cors = require('cors')


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://zenTarg:swarup0225@swarup1.hovsebl.mongodb.net/").then(
    console.log("success in Connection")
)
app.use(cors())

app.use("/api",mainRouter);

console.log("Fine");

app.listen(3000);
