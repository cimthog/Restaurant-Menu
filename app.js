const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    app = express(),
    register = require('./routes/signup')
    login = require('./routes/login');
    dashboard = require('./routes/dashboard');
const cors = require('cors');


    mongoose.connect("mongodb://localhost/resturant_menu", {useNewUrlParser: true});
    mongoose.Promise = global.Promise;
    const connection = mongoose.connection;
    connection.on('connected', () => console.log("Successfully connected to database"));
    connection.on('err', () => console.log("Failed to connect to db"));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    app.use(cors());

    app.use('/login',login)
    app.use('/register',register)
    app.use('/dashboard',dashboard)

    //Starting the server
const server = app.listen(3000, ()=>{
    console.log(`Server started on port ${server.address().port}`);
})