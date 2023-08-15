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

connectDB();

app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false})); // to read form data
app.use(express.json()) // to read JSON Data
app.use(cookieParser());

app.use('/signup', require('./routes/register'))
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
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
app.listen(PORT,     ()=> {console.log('Server running on PORT 3500')});