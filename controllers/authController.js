const express = require('express');
const controller = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');


// Test to see if the passport middleware works to check if the JWT token is valid
// const passport = require('passport')

// controller.get('/protected', passport.authenticate('jwt', { session: false }),(req, res) => {
//     return res.json("protected route accessed")
// })


controller.post('/signup', async (req, res) => {
    try {
        const { name, email, password, picture } = req.body;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        // console.log(req.body)
        if(!name || !email || !password) {
            // 422 error: Server has understood the request but can not process it
            return res.status(422).json({error: "Fields are missing"})
        } 


        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.status(422).json({error: "User already exits. Please register with another email."})
        } else {
            try {
                const inputs = {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    picture: picture
                }

                await User.create(inputs)
                // returns successful sign up message after sign up
                return res.status(200).json({message: "User successfully created"})


            } catch(e) {
                return res.status(400).json({
                    name: e.name,
                    message: e.message
                })
            }
        }

    } catch (e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }
    
})


controller.post('/signin', async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(422).json({error: "Fields are missing"})
        } 

        const existingUser = await User.findOne({email: email});

        if(!existingUser) {
            return res.status(401).json({error: "Invalid Email or Password. Please try again."})
        } else {
            const isCorrectPassword = bcrypt.compareSync(password, existingUser.password)

            if(!isCorrectPassword) {
                return res.status(401).json({error: "Invalid Email or Password. Please try again."})
            } else {
                // return res.json({message: "User logged in"})
                const token = jwt.sign({_id: existingUser._id}, JWT_SECRET)
                const { _id, name, email, followers, following, picture } = existingUser
                // returns JWT token after successful sign in
                return res.json({token, user:{_id, name, email, followers, following, picture }})
            }
        }

    } catch (e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }

})


module.exports = controller;