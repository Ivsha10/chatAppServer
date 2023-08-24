const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }, 
    fullName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type:String,
        require: true
    },
    imageBase: {
        type: String, 
        require: true
    },
    loggedIn: {
        type: Boolean   
     }, 
    refreshToken: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;