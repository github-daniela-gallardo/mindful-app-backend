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

router.post('/answer', (req,res,next) =>{
    Answer.create({
        answer: req.body.answer
    })
    .then(createdAnswer => {
        res.send(createdAnswer)
    })
    .catch(err => console.log(err))
})

router.post('/notes', (req, res, next) =>{
    Notes.create({
        title: req.body.title,
        date: req.body.date,

    })
    .then(createdNote =>{
        res.send(createdNote)
    })
    .catch(err => console.log(err))
})

module.exports = router;