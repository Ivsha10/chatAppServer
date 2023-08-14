const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user1: {             //user who initiated new chat
        type: String,
        required: true
    }, 
    user2: {
        type: String,
        required: true
    }, 
    chat: {
        type: Array, //array should contain a sender, receiver, and a message
        required: true
    }
})

const Chat = mongoose.model('chat', chatSchema);
module.exports = Chat;