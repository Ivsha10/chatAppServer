const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.addNewMessage);
router.post('/getall', chatController.getAllChats);

module.exports = router;