const express = require ('express')
const router = express.Router();
const Question = require('../models/Question.model')
const Answer =require('../models/Answer.model')
const Notes = require('../models/Notes.model')



router.get('/questions', (req, res, next) => {
    Question.find()
    .then(foundQuestion =>{
        res.send(foundQuestion)
    })
    .catch(err => console.log(err))
})



router.post('/createnote', (req, res, next) =>{
    Notes.create({
        title: req.body.title,
        date: req.body.date,
        user: req.payload._id

    })
    .then(createdNote =>{
        res.send(createdNote)
    })
    .catch(err => console.log(err))
})


router.post('/answer', (req,res,next) =>{
    console.log(req.body);
    const answersWithQuestionIds = req.body.answer.map((a, i) => {
        return {
            answer: a,
            question: req.body.questions[i]._id,
            notes: req.body.noteId
        }
    })
    Answer.insertMany(answersWithQuestionIds)
    .then(createdAnswerArray => {
        const answerIds = createdAnswerArray.map(a => a._id)
        return Notes.findByIdAndUpdate(req.body.noteId, {
            $push: {
                answers:{
                    $each: answerIds
                }
            }
        }, {new:true})
        
    })
    .then(updatedNote => {
        res.send(updatedNote)
    })
    .catch(err => console.log(err))
})



router.get('/notes', (req, res, next) =>{
    Notes.find()
    .then(foundNote => {
        res.send(foundNote)
    })
    .catch(err => console.log(err))
})

module.exports = router;