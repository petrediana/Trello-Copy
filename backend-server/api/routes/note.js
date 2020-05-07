const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Note = require('../models/note');

router.get('/', (req, res, next) => {
    Note.find()
    .select('_id name description noteListId')
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

router.get('/that-belong-to/:noteListId', (req, res, next) => {
    const noteListId = req.params.noteListId;

    Note.find({ "noteListId": noteListId })
    .select('_id name description noteListId')
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

router.get('/specific-note/:noteId', (req, res, next) => {
    const noteId = req.params.noteId;
    Note.findById(noteId)
    .select('_id name description noteListId')
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
        const dbNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            noteListId: req.body.noteListId
        });
        dbNote.save();
        res.status(201).json({
            message: 'Created Note',
            createdNote: dbNote
        });
    } catch(err) {
        console.warn(err);
        next(err);
    }
});

router.delete('/:noteId', (req, res, next) => {
    const noteIdToRemove = req.params.noteId;
    Note.remove({_id: noteIdToRemove})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Note deleted!',
            deletedNoteId: noteIdToRemove,
            result: result
        });
    })
    .catch(err => {
        console.warn(err);
        next(err);
    });
});

router.put('/:noteId', (req, res, next) => {
    const noteIdToUpdate = req.params.noteId;
    const updateOps = {}; 
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Note.updateOne({ _id: noteIdToUpdate }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Note updated!',
            updatedNoteId: noteIdToUpdate,
            result: result
        });
    })
    .catch(err => {
        console.warn(err);
        next(err);
    });
});

module.exports = router;