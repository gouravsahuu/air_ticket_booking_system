const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../Models/user.model");

const userRoute = express.Router();

userRoute.post("/register",async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const existingUser = await UserModel.find({email});
        if(existingUser.length == 0){
            bcrypt.hash(password, 5, async (err,hash) => {
                if(err){
                    res.status(400).send({"message":"Something Went Wrong","error":err.message});
                }
                else{
                    const newUser = new UserModel({name,email,password:hash});
                    await newUser.save();
                    res.status(201).send({"message":"User registered successfully"});
                }
            })
        }
        else{
            res.status(400).send({"message":"User already exists"});
        }
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

userRoute.post("/login",async (req,res) => {
    const {email,password} = req.body;
    try{
        const userExists = await UserModel.find({email});
        if(userExists.length > 0){
            bcrypt.compare(password, userExists[0].password, (err,result) => {
                if(result){
                    let token = jwt.sign({userID:userExists[0]._id},process.env.key,{ expiresIn: '1h' });
                    res.status(201).send({"message":"Login Success","token":token});
                }
            })
        }
        else{
            res.status(400).send({"message":"User not found"});
        }
    }
    catch(err){
        res.status(400).send({"message":"Something Went Wrong","error":err.message});
    }
})

module.exports = {userRoute};