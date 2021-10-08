const express = require('express');
const controller = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require("../models/post");

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

module.exports = controller