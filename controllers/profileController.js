const express = require('express');
const controller = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require("../models/post");
const User = require("../models/user");

// FIND USER INFO ROUTE, TO POPULATE PROFILE PAGE
controller.get('/profile/:userId', passport.authenticate('jwt', { session: false }), async(req, res) =>{
    try {
        const findUser = await User.findById(
            req.params.userId,
            '-password'
            )
        if(!findUser) {
            res.status(422).json({error:"Sorry, user not found."})
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
                    res.status(422).json({error: "Unable to retrieve posts for user. Please try again."})
                } else {
                    // returns details on queried user and all associated posts for said user
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

// FOLLOW ROUTE - UPDATES LIST OF FOLLOWERS AND FOLLOWING
controller.put('/follow', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        // Update the list of followers for a user that the logged in user is trying to follow
        const updateFollowers = await User.findByIdAndUpdate(
            {_id: req.body.followId},
            {
                $addToSet:{followers:req.user._id}
            }, {
                new: true
            }
        )

        if(!updateFollowers) {
            res.status(422).json({error: "Unable to follow this user. Try again later."})
        } else {
            try {
                // Update the list of following for the current logged in user
                const updateFollowing = await User.findByIdAndUpdate(
                    req.user._id,
                    // "-password",
                    {
                        $addToSet:{following:req.body.followId}
                    }, {
                        new: true,
                        select: '-password'
                    }
                )
                if(!updateFollowing){
                    res.status(422).json({error: "Unable to follow this user. Try again later."})
                } else {
                    res.json({updateFollowing})
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


// UNFOLLOW ROUTE - UPDATES LIST OF FOLLOWERS AND FOLLOWING
controller.put('/unfollow', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        // Update the list of followers for a user that the logged in user is trying to follow
        const updateFollowers = await User.findByIdAndUpdate(
            {_id: req.body.followId},
            {
                $pull:{followers: req.user._id}
            }, {
                new: true
            }
        )

        if(!updateFollowers) {
            res.status(422).json({error: "Unable to unfollow this user. Try again later."})
        } else {
            try {
                // Update hte list of following for the current logged in user
                const updateFollowing = await User.findByIdAndUpdate(
                    req.user._id,
                    // "-password",
                    {
                        $pull:{following:req.body.followId}
                    }, {
                        new: true,
                        select: '-password'
                    }
                )
                if(!updateFollowing){
                    res.status(422).json({error: "Unable to unfollow this user. Try again later."})
                } else {
                    res.json({updateFollowing})
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