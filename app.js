const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    app = express(),
    register = require('./routes/signup')
    login = require('./routes/login');
    dashboard = require('./routes/dashboard');
const cors = require('cors');
const logger = require('morgan');

const menuModel = require('./models/menu');
const publicPath = path.resolve(__dirname, "public");


    mongoose.connect("mongodb://localhost/resturant_menu", {useNewUrlParser: true});
    mongoose.Promise = global.Promise;
    const connection = mongoose.connection;
    connection.on('connected', () => console.log("Successfully connected to database"));
    connection.on('err', () => console.log("Failed to connect to db"));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    app.use(express.static(publicPath));
    app.use(cors());

    app.use(logger('dev'));

    app.use('/login',login)
    app.use('/register',register)
    app.use('/dashboard',dashboard)

    app.get('/api/v1/menu', (req, res) => {
        menuModel.find({}, (err, menuItems) => {
            if(err){
                console.log('Error getting all food items');
                return next(err)
            }

            res.status(200).json({
                items: menuItems
            })
        })
    });

    app.get('/api/v1/menu/:category', (req, res) => {
        console.log(req.params.category)
        menuModel.find({
            category: req.params.category
        }, (err, menuItems) => {
            if(err){
                console.log('Error getting all food items');
                return next(err)
            }

            res.status(200).json({
                items: menuItems
            })
        })
    })

    //Starting the server
const server = app.listen(3000, ()=>{
    console.log(`Server started on port ${server.address().port}`);
})