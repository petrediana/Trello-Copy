const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Board = require('../models/board');

router.get('/', (req, res, next) => {
    Board.find()
    .select('_name description starred userId')
    .exec()
    .then(docs => {
        console.log('From db: ' + docs);  
        if (docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message : 'No data available'
            });
        }
    })
    .catch(err => {
        console.warn(err);
        next(err);
    });
});

router.post('/', (req, res, next) => {
    try {
        const dbBoard = new Board({
            _id: new mongoose.Types.ObjectId(),
            description: req.body.description,
            userId: req.body.userId
        });
        dbBoard.save();
        res.status(201).json({
            message: 'Board created',
            createdBoard: dbBoard
        });
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    
    Board.find({ "userId": userId })
    .select('_name description starred userId')
    .exec()
    .then(docs => {
        console.log('From db: ' + docs);  
        if (docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message : 'No data available'
            });
        }
    })
    .catch(err => {
        console.warn(err);
        next(err);
    });
});



module.exports = router;