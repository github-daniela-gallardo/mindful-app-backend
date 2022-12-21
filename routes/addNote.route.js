const express = require ('express')
const router = express.Router();
const Question = require('../models/Question.model')
const Answer =require('../models/Answer.model')
const Notes = require('../models/Notes.model')
const User = require('../models/User.model')



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


// this route show all the notes associated with the user that is logged in 
router.get('/notes', (req, res, next) =>{
   
    Notes.find({user: req.payload._id})
    .then(foundNote => {
        res.send(foundNote)
    })
    .catch(err => console.log(err))
})






// this route show one note when you click on it 
router.get('/notes/:noteId', (req, res, next) =>{
   
    Notes.findById(req.params.noteId)
    .populate(
        {path: 'answers',
        populate: {path: 'question'}
            }
        )
    .then(foundNote => {
        res.send(foundNote)
    })
    .catch(err => console.log(err))
})



// create a route here that will let me update the note selected -> update answers

router.put('/update', (req, res, next) =>{

    Notes.findByIdAndUpdate({user: req.payload._id})

})  




// create a route that will let me delete the note 

// router.delete('/notes/:noteId', (req, res, next) =>{

//     Notes.findByIdAndRemove(req.body.noteId)
//     .then(deletedNote => {
//         res.send(deletedNote)
//     })
//     .catch(err => console.log(err))
// })


module.exports = router;