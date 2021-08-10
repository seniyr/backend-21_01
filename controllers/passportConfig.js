const session = require('express-session');
const express = require('express')
var passport = require('passport');


const connection = require('../database/scripts/mongo_init')
const MongoStore = require('connect-mongo')(session);

const sessionStore = new MongoStore({
    mongooseConnection : connection,
    collection : 'sessions'

})

module.exports = function(router){
    
    const oneDay = 1000 * 60 * 60 * 24;

    router.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        store:sessionStore, // this would use this mongo store for storing sessions
        resave: false
    })); // so basicly everything is stored in express session object and every request comes with res.session
    // everytime we visit website it just creates a cookie in both our browser and in the database which expires in 1 day.
    // if we login from diffrent computer or say delete the cookie and login again, we r new device so new cookie for us.
    require("./Passport") // would load passport.use statergy
    require("./passportGoogle") // would load passport.use statergy

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.use(passport.initialize());
    router.use(passport.session()); // passport cleverly uses the current session which passed data middleware to middleware
    console.log("intitialised \n")
    // from using req.session. So basicly if for that session User was generated previously.
    //i must have been stored in session.passport.user and thus, passport will automaticly detect it and fetch  user details. and put in req.user
    return;
}