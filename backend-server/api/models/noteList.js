const mongoose = require('mongoose');

const noteListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', require: true }
});

module.exports = mongoose.model('NoteList', noteListSchema);