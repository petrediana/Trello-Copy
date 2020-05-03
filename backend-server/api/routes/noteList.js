const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const NoteList = require('../models/noteList');

router.get('/', (req, res, next) => {
    NoteList.find()
    .select('_id name boardId')
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

router.get('/that-belong-to/:boardId', (req, res, next) => {
    const boardId = req.params.boardId;

    Board.find({ "boardId": boardId })
    .select('_name description starred boardId')
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

router.get('/specific-noteList/:noteListId', (req, res, next) => {
    const noteListId = req.params.noteListId;
    NoteList.findById(noteListId)
    .exec()
    .then(doc => {
        console.log('From db: ' + doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message : 'not found :('
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
        const dbNoteList = new NoteList({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            boardId: req.body.boardId
        });
        dbNoteList.save();
        res.status(201).json({
            message: 'Created NoteList',
            createdNoteList: dbNoteList
        });
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

router.delete('/:noteListId', (req, res, next) => {
    const noteListIdToRemove = req.params.noteListId;
    NoteList.remove({_id: noteListIdToRemove})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'NoteList deleted!',
            deletedNoteListId: noteListIdToRemove,
            result: result
        });
    })
    .catch(err => {
        console.warn(err);
        next(err);
    })
});

router.patch('/:noteListId', (req, res, next) => {
    const noteListIdToUpdate = req.params.noteListId;
    const updateOps = {}; 
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    NoteList.updateOne({ _id: noteListIdToUpdate }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'NoteList updated!',
            updatedNoteListId: noteListIdToUpdate,
            result: result
        });
    })
    .catch(err => {
        console.warn(err);
        next(err);
    });
});

module.exports = router;