//import express
const express = require("express");
var cors = require("cors");

const connection = require("./connection"); //import connection to sql
const userRoute = require("./routes/user");
const categoryRoute =  require("./routes/category");
const carRoute =  require("./routes/car");
const billRoute =  require("./routes/bill");
const dashboardRoute =  require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true })); //importam urlencoded
app.use(express.json());
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/car", carRoute);
app.use("/bill", billRoute);
app.use("/dashboard", dashboardRoute);
app.use(express.static('image'));

module.exports = app;
