const express = require("express");

const {FlightModel} = require("../Models/flight.model");

const flightRoute = express.Router();

flightRoute.get("/flights",async (req,res) => {
    try{
        const flights = await FlightModel.find();
        res.status(200).send(flights);
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

flightRoute.get("/flights/:id",async (req,res) => {
    const id = req.params.id;
    try{
        const flights = await FlightModel.findById(id);
        res.status(200).send(flights);
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

flightRoute.post("/flights",async (req,res) => {
    const {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price} = req.body;
    try{
        let newFlight = new FlightModel({airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price});
        await newFlight.save();
        res.status(201).send({"message":"Flight added successfully"});
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

flightRoute.patch("/flights/:id",async (req,res) => {
    const id = req.params.id;
    try{
        const result = await FlightModel.findByIdAndUpdate(id,req.body);
        res.status(204).send({"message":"Flight edited successfully"});
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

flightRoute.delete("/flights/:id",async (req,res) => {
    const id = req.params.id;
    try{
        const result = await FlightModel.findByIdAndDelete(id);
        res.status(202).send({"message":"Flight deleted successfully","deleted_flight_info":result});
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

module.exports = {flightRoute};