const bcryptjs = require('bcryptjs');
const User =require('../models/User.model');
const jwt = require('jsonwebtoken');

const salt =10;

const signUpControllers = (req, res, next) => {
    if (!req.body.email || req.body.password || req.body.userName){
        return res.status(400).json({
            error: {
                message: 'All fields are require'
            }
        });
    }

    User.create({
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, salt),
        userName: req.body.userName
    })
    .then(createdUser => {
        console.log('this is the new user', createdUser)
    })

  }

  module.exports = {signUpControllers }