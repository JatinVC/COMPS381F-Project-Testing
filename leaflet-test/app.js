require('dotenv').config();
const express = require('express');
var app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const ejs = require('ejs');
const mongoose = require('mongoose');

global.configFile = process.env;
db = require('./lib/db')({global:true});

const restaurantModel = {
    address:{
        building: String,
        coord: [String],
        street: String,
        zipcose: String
    },
    borough: String,
    cuisine: String,
    grades:[
        {
            date: Date,
            grade: String,
            score: Number
        }
    ],
    name: String,
    restaurant_id: String
};


const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    global.restaurant = mongoose.model('Restaurant', restaurantModel);
});

var server = http.createServer(app);
server.listen(3001);

//allowing requests CORS (Cross origin resource sharing)
app.use(function(req, res, next) {
    app.options('*', cors());
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

//requiring the routes

//routing the mounting