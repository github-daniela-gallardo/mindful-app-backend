const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const Question = require('../models/Question.model');

mongoose.connect(process.env.MONGODB_URI)
    .then(x => {
        console.log('connected to db named', x.connections[0].name)
    })
    .catch(err => console.log(err))


Question.create({
    text: 'What is the strongest feeling I am experiencing right now?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));

Question.create({
    text: 'What am I most grateful for today? How can I express this gratitude?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));


Question.create({
    text: 'What are three positive things that happened today?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));



Question.create({
    text: 'Was there a difficult thought or emotion that came up for me today? How did I respond to this?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));


Question.create({
    text: 'What made me smile today? What was the happiest moment of my day?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));


Question.create({
    text: 'What things in my day created the most stress or anxiety?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));


Question.create({
    text: 'What was the most important thing I accomplished or made progress on today?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));


Question.create({
    text: 'What did I learn or discover today? What was the greatest lesson learned today?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));


Question.create({
    text: 'Is there something from the day that I would I like to change? What changes could I try tomorrow?'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));

Question.create({
    text: 'Add anything else...'
})
    .then(questionCreated => console.log('this is the question created', questionCreated))
    .catch(err => console.log(err));