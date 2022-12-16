const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User.model');

mongoose.connect(process.env.MONGODB_URI)
.then(x => {
    console.log('connected to db named' ,  x.connections[0].name);
    return User.create({
        email: 'test@test.com',
        password: 'test',
        userName: 'test'
    })
    .then(createdUser => {
        console.log('this is the user that i just create', createdUser)
    })
})
.catch(err => console.log(err))