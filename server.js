require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Passport setup for token verification
const passport = require('passport');
const strategy = require('./passport');

passport.use(strategy);

const { MONGO_URI } = require('./config/keys');
const app = express();

// Required Controllers
const authController = require('./controllers/authController');

// DB Connection methods
const dbConnection = mongoose.connection;
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
dbConnection.on("connected", () => console.log("Database Connected Successfully"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () => console.log("My database is disconnected"));

require('./models/user');

// Additional middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


// Linking to the controllers
app.use('/api', authController);

app.listen(process.env.PORT)