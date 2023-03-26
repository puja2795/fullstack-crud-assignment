const express = require("express");
const {UserModel} = require("../models/user.model")
const {hash,compare} = require("bcrypt")
const jwt = require("jsonwebtoken")
// bcrypt.compare()
const userRouter = express.Router();

userRouter.post("/register", (req,res) => {
    try{
        const {email,password,location,age} = req.body;
        hash(password, 10, async (err, hash) => {
            const user = new UserModel({email,password:hash,location,age});
            await user.save();
            res.status(200).send({"msg":"Registration successful"});
        })
    }
    catch(err){
        res.status(400).send({"msg":"Registration Failed"});
    }
})

userRouter.post("/login", async (req,res) =>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email})
        compare(password, user.password, (err, matched) => {
            if(matched){
                res.status(200).send({"msg":"Login Successful", token:jwt.sign({id:user._id},"fullstack")})
            }
            else{
                res.status(400).send({"msg":"Login Failed!"})
            }
        });        
    }    
    catch(err){
        console.log(false);
        res.send(false)
    }
})

module.exports={userRouter}