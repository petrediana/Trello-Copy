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

router.get('/starred/:userId', (req, res, next) => {
    const userId = req.params.userId;

    Board.find({ "userId": userId, "starred": true })
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
})

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

router.delete('/:boardId', (req, res, next) => {
    const boardIdToRemove = req.params.boardId;
    Board.remove({_id: boardIdToRemove})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Board deleted!',
            deletedBoardId: boardIdToRemove,
            result: result
        });
    })
    .catch(err => {
        console.warn(err);
        next(err);
    })
});

router.patch('/:boardId', (req, res, next) => {
    const boardIdToUpdate = req.params.boardId;
    const updateOps = {}; 
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Board.updateOne({ _id: boardIdToUpdate }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Board updated!',
            updatedBoardId: boardIdToUpdate,
            result: result
        });
    })
    .catch(err => {
        console.warn(err);
        next(err);
    });
});

module.exports = router;