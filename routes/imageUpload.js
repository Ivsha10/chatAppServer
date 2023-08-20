const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/', imageController.upload.single('image'), (req, res, next=> {
    res.send('Successfully uploaded ' + req.file.originalname);
}))

module.exports = router;