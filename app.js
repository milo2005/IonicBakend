var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;
var cors = require('cors');

var users = require('./routes/users');
var books = require('./routes/books');

var app = express();
app.use(cors());

let dbMongo;
mongodb.connect("mongodb://localhost:27017/library", (err, db)=>{
    if(err){
        console.log("Error al conectarse a mongo");
    }
    dbMongo = db;
});

app.use((req,res,next)=>{
    req.db = dbMongo;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/users', users);
app.use('/api/books', books);

module.exports = app;
