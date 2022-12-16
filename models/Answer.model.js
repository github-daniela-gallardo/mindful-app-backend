const mongoose =require('mongoose');
const Schema = mongoose.Schema; 



const answerSchema = new Schema ({
    answer: {type: String, maxLength: 2000},
    notes: { type: Schema.Types.ObjectId, ref: 'Notes'},
    question: { type: Schema.Types.ObjectId, ref: 'Question'}
})

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer; 