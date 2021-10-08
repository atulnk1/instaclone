require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/keys');

const authController = require('./controllers/authController');


const dbConnection = mongoose.connection;

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

dbConnection.on("connected", () => console.log("Database Connected Successfully"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () => console.log("My database is disconnected"));

require('./models/user');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Linking to the controllers
app.use(authController);

app.listen(process.env.PORT)