const express = require("express");
const cors = require("cors");
const {connection} = require("./Configs/db");
require("dotenv").config();
const port = process.env.port || 8080;
const {userRoute} = require("./Routes/user.routes");
const {flightRoute} = require("./Routes/flight.route");
const {bookingRoute} = require("./Routes/booking.route");
const app = express();

app.use(express.json());

app.use("/api",userRoute);
app.use("/api",flightRoute);
app.use("/api",bookingRoute);
app.get("/",(req,res) => {
    res.status(201).send({"message":"This is the backend server for Air Ticket Booking System"});
})

app.listen(port,async () => {
    try{
        await connection;
        console.log("Connected to DB");
        console.log(`Server is running at port ${port}`);
    }
    catch(err){
        console.log(err.message);
    }
})