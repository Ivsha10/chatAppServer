const { compareSync } = require('bcrypt');
const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI, 
           { useUnifiedTopology: true,
            useNewURLParser: true
        });
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = connectDB;