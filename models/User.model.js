const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String, 
        unique: true, 
        require: true
    },
    password: {
        type: String, 
        require: true
    },
    
    userName: String
})

const User = mongoose.model('User', userSchema);
module.exports= User;