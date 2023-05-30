const express = require("express");

const {BookingModel} = require("../Models/booking.model");

const bookingRoute = express.Router();

bookingRoute.post("/booking",async (req,res) => {
    const {user,flight} = req.body;
    try{
        const newBooking = new BookingModel({user,flight});
        await newBooking.save();
        res.status(201).send({"message":`Flight ${flight} booked successfully by User ${user}`});
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

bookingRoute.get("/dashboard", async (req,res) => {
    try{
        const bookings = await BookingModel.find().populate(["user","flight"]);
        res.status(200).send(bookings);
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

module.exports = {bookingRoute};