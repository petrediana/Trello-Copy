const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./api/routes');
const cors = require('cors');

mongoose.connect('mongodb+srv://diana:'
+ process.env.MONGO_ATLAS_PW
+ '@node-rest-trillo-copy-fwtqb.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user-api/users', routes.user);
app.use('/board-api/boards', routes.board);
app.use('/notelist-api/notelists', routes.noteList);
app.use('/note-api/notes', routes.note);

app.use((req, res, next) => {
    const error = new Error('Not found :(');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});


module.exports = app;