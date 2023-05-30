const mongoose = require("mongoose");
const {UserModel} = require("../Models/user.model");
const {FlightModel} = require("../Models/flight.model");


const bookingSchema = mongoose.Schema({
    user : { type: mongoose.ObjectId, ref: UserModel},
    flight : { type: mongoose.ObjectId, ref: FlightModel}
})

const BookingModel = mongoose.model("booking",bookingSchema);

module.exports = {BookingModel};