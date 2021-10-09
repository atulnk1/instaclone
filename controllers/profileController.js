const express = require('express');
const controller = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require("../models/post");
const User = require("../models/user");

controller.get('/profile/:userId', passport.authenticate('jwt', { session: false }), async(req, res) =>{
    try {
        const findUser = await User.findById(
            req.params.userId,
            '-password'
            )
        if(!findUser) {
            res.status(404).json({error:"Sorry, user not found."})
        } else {
            try {
                const findPosts = await Post.find({
                    postedBy: req.params.userId
                })
                .populate([
                    {
                        path: 'postedBy',
                        select: ['_id','name']
                }])

                if(!findPosts){
                    res.status(422).json({error: "Unable to retrieve posts by user. Please try again."})
                } else {
                    res.json({findUser, findPosts})
                }
            } catch(e) {
                return res.status(400).json({
                    name: e.name,
                    message: e.message
                })
            }
        }
    } catch(e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }
})




module.exports = controller;