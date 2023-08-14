const Chat = require('../model/Chat');
const User = require('../model/User');

const getAllChats = async (req, res) => {
    const sender = req.body.sender;
    const userChats = [...await Chat.find({user1: sender}), ...await Chat.find({user2:sender})];
    res.json(userChats);
}
const addNewMessage = async (req, res) => {
    const { sender, receiver, message } = req.body;
    const newMessage = { sender: sender, receiver: receiver, content: message };
    let foundChat = await Chat.findOne({ user1: sender, user2: receiver }).exec() ||
        await Chat.findOne({ user1: receiver, user2: sender }).exec();

    if (foundChat) {
        foundChat.chat.push(newMessage);
        foundChat.save();
    } else {
        let result = await Chat.create({
            'user1': sender,
            'user2': receiver,
            'chat': newMessage
        })
        foundChat = await Chat.findOne({ user1: sender, user2: receiver }).exec() ||
            await Chat.findOne({ user1: receiver, user2: sender }).exec();
    }
    res.json(foundChat);
}

module.exports = { getAllChats, addNewMessage };