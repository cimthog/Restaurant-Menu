const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    app = express();


    mongoose.connect("mongodb://localhost/resturant_menu");
    mongoose.Promise = global.Promise;
    const connection = mongoose.connection;
    connection.on('connected', () => console.log("Successfully connected to database"));
    connection.on('err', () => console.log("Failed to connect to db"));



    //Starting the server
const server = app.listen(3000, ()=>{
    console.log(`Server started on port ${server.address().port}`);
})