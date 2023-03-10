const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');




const salt = 10;

const signUpControllers = (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.userName) {
        return res.json({
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
            res.send(createdUser)
            console.log('this is the new user', createdUser)
        })
        .catch(err => res.send(err))

}

const loginController = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            error: {
                message: 'Missing email or password'
            }
        })
    }

    let myUser;
    User.findOne({ email})
        .then(foundUser => {
            if (!foundUser) {
                return Promise.reject('Invalid email or password')
            }
            myUser = foundUser
            return bcryptjs.compare(password, foundUser.password)
                
        }).then(isValidPassword => {
                    if (!isValidPassword) {
                        return Promise.reject('Invalid email or password')
                    }

                    const payload = {
                        _id: myUser._id,
                        email: myUser.email,
                        userName: myUser.userName
                    }
                    const authToken = jwt.sign(
                        payload,
                        process.env.TOKEN_SECRET,
                        { algorithm: 'HS256', expiresIn: "12h" }
                    );
                    res.json({
                        authToken: authToken
                    })
                })
        .catch(err => console.log(err))
}


const updateUser = (req, res, next) => {

    if(req.body.password){
        User.findByIdAndUpdate(
                req.payload._id 
                , {
                userName: req.body.userName,
                email: req.body.email,
                password:  bcryptjs.hashSync(req.body.password)
            }, { new: true })
            
            .then(updatedUser => {
                const payload = {
                    _id: updatedUser._id,
                    email: updatedUser.email,
                    userName: updatedUser.userName
                }
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "12h" }
                );
                res.json({
                    authToken: authToken
                })
            })
            .catch(err => console.log(err))
    } else {
        User.findByIdAndUpdate(
            req.payload._id 
            , {
            userName: req.body.userName,
            email: req.body.email,
        }, { new: true })
        
        .then(updatedUser => {
            const payload = {
                _id: updatedUser._id,
                email: updatedUser.email,
                userName: updatedUser.userName
            }
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "12h" }
            );
            res.json({
                authToken: authToken
            })
        })
        .catch(err => console.log(err))
    }
    
}

const deleteUser =(req, res, next) =>{
    User.findByIdAndRemove(req.payload._id)
    .then(deletedUser =>{
        res.json(deletedUser)
    })
    .catch(err =>console.log(err))
}



module.exports = { signUpControllers, loginController , updateUser, deleteUser}