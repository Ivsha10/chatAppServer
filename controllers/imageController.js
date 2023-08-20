const express = require('express');
const multer  = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKet: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'my_bucket',
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = {upload};