const express = require("express");

const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//    route are import here..

const user = require("./routes/userRoutes");


app.use("/api/v1", user);

module.exports = app;
