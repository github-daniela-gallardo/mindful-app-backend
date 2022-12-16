const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notesSchema = new Schema ({
    title: String,
    date: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer'}]

})

const Notes = mongoose.model('Notes', notesSchema)
module.exports = Notes;