const express = require('express');
const controller = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SENDGRID_API } = require('../config/keys');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key:SENDGRID_API
    }
}))

// Helper funciton to send the welcome email
const emailNewUser = (newUserEmail) => {
    // console.log(newUserEmail)
    transporter.sendMail({
        to: newUserEmail,
        from: "atulnk1@gmail.com",
        subject:"Welcome to InstaClone!",
        html:"<h1>Welcome to InstaClone</h1>"
    })
}
// Helper function to send the password reset email
const passwordReset = (passwordResetEmail) => {
    // console.log(passwordResetEmail)
    transporter.sendMail({
        to: passwordResetEmail,
        from: "atulnk1@gmail.com",
        subject:"Password Reset Request",
        html:`<h1>There was a request to reset your password with this email address</h1>
        <h3>Please click this <a href="google.com">link</a> to reset your password`
    })
}

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

                await emailNewUser(inputs.email)
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


controller.post('/reset-password', async (req, res) => {
    // creating a token for the reset password
    crypto.randomBytes(32, async (err, buffer) => {
        if(err) {
            return res.json({err})
        }
        // changing from hexcode to String for the token
        const token = buffer.toString('hex');

        try {
            const findResetPasswordUser = await User.findOneAndUpdate(
                {email: req.body.email},
                {
                    resetToken: token,
                    expireToken: Date.now() + 3600000
                },
                {
                    new: true,
                    select: '-password'
                }
            )
            
            if(!findResetPasswordUser) {
                return res.status(422).json({error: "Sorry, user does not exist."})
            } else {
                passwordReset(findResetPasswordUser.email);
                return res.json({message: "Password reset email sent!"})
            }
        } catch (e) {
            return res.status(400).json({
                name: e.name,
                message: e.message
            })
        }
    })
})

module.exports = controller;