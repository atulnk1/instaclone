const express = require('express');
const controller = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require("../models/post");

// SHOW ALL POSTS

controller.get('/allposts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const posts = await Post.find({})
        // .populate("postedBy", "_id name")
        .populate([
            {
                path: 'postedBy',
                select: ['_id','name']
            }])
        // returns list of all posts currently available on the app
        res.json({posts})
    } catch(e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }
})

// GET ALL POSTS FOR A PARTICULAR USER

controller.get('/myposts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        console.log(req.user._id)
        const myPosts = await Post.find({postedBy:req.user._id})
        .populate([
            {
                path: 'postedBy',
                select: ['_id','name']
            }])
        // Return list of posts associated to the user who is currently using the app
        return res.json({myPosts})
    } catch(e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }
})

// CREATE NEW POST
controller.post('/newpost', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { title, caption, image } = req.body;
        if(!title || !caption || !image){
            return res.status(422).json({error: "Fields are missing. Please ensure you add all necessary fields"})
        } 
        // To remove the hashed password from the return statement
        req.user.password = undefined
        try {
            const inputs = {
                title: title,
                caption: caption,
                image: image,
                postedBy: req.user
            }

            const post = await Post.create(inputs)
            // returns new post object to the requester after successful post 
            return res.json({post})


        } catch(e) {
            return res.status(400).json({
                name: e.name,
                message: e.message
            })
        }

    } catch(e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }
    
})

// LIKE A POST 
controller.put('/like', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const postToLike = await Post.findByIdAndUpdate(
            req.body.postId,
            {
                // addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.  
                $addToSet: {likes:req.user._id}
            }, {
                new: true
            }
        );

        // console.log(postToLike)

        if(postToLike) {
            // returns entire post that was like by the user
            return res.json(postToLike)
        } else {
            return res.status(422).json({error:"Sorry, unable to like the post. Please try again later."});
        }

    } catch(e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }

})

// REMOVE LIKE FROM POST
controller.put('/unlike', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const postToUnLike = await Post.findByIdAndUpdate(
            req.body.postId,
            {
                // pull operator removes from an existing array all instances of a value or values that match a specified condition.
                $pull: {likes:req.user._id}
            }, {
                new: true
            }
        );

        // console.log(postToLike)

        if(postToUnLike) {
            // returns entire post that was just unliked by the user
            return res.json(postToUnLike)
        } else {
            return res.status(422).json({error:"Sorry, unable to like the post. Please try again later."});
        }

    } catch(e) {
        return res.status(400).json({
            name: e.name,
            message: e.message
        })
    }

})

module.exports = controller