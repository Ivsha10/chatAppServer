require('dotenv').config();
const express = require('express');
const PORT = 3500;
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

var upload = multer({ dest: 'images/' });

connectDB();

app.use(cors(corsOptions))
app.use('/images', express.static('images'));
app.use(express.urlencoded({extended:true})); // to read form data
app.use(express.json()) // to read JSON Data
app.use(cookieParser());



app.get('/', (req, res) => {res.send('Welcome to ConnectX Server')})

app.use('/signup', upload.single('image'), require('./routes/register') )
app.use('/login', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/getusers', require('./routes/user'));
app.use('/chat', require('./routes/chat'));

app.all('*', (req, res) => {
    res.json({"Error" : 'ERROR 404! PAGE NOT FOUND'});
})

mongoose.connection.once(('open'), ()=> {
    console.log('Connected to MongoDB')
})
app.listen(PORT, ()=> {console.log('Server running on PORT 3500')});