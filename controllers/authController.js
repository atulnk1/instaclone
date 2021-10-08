const express = require('express');
const controller = express.Router();

controller.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    if(!name || !email || !password) {
        // 422 error: Server has understood the request but can not process it
        return res.status.apply(422).json({error: "Fields are missing"})
    } 
    res.json({message: "Successful login"})
})


module.exports = controller;