const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User.model');
const Answer = require('../models/Answer.model');
const Notes = require('../models/Notes.model');


mongoose.connect(process.env.MONGODB_URI)

//for testing porpouses we can delete many so it wont add the same user etc..  
    // .then(x => {
    //     console.log('connected to db named', x.connections[0].name)
    //     return User.deleteMany()
    // })
    // .then(() => {
    //     return Notes.deleteMany()
    // })
    // .then(() => {
    //     return Answer.deleteMany()
    // })
    .then(() => {
        return User.create({
            email: 'test1@test1.com',
            password: '123',
            userName: 'test1'
        })
    })
    .then(createdUser => {
        console.log('this is my new user', createdUser)
        return Notes.create({
            title: 'first note in my journal',
            date: Date.now(),
            user: createdUser._id,
        });
    })
    .then(createdNote => {
        console.log('this is my new note', createdNote)

        return Answer.create({
            answer: 'i am happy today',
            notes: createdNote._id,
            question: '639cafe3511d40c84006dd87'
        })
    })
    .then(createdAnswer =>{
        console.log('this is my answer ', createdAnswer)
    })
    .catch(err => console.log(err))


