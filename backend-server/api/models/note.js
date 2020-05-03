const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    description: { type: String, default: '' },
    noteListId: { type: mongoose.Schema.Types.ObjectId, ref: 'NoteList', require: true }
});

module.exports = mongoose.model('Note', noteSchema);