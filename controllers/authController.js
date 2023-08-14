const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const handleLogin =  async function(req, res) {
    const{username, pwd} = req.body;
    if(!username || !pwd) return res.status(400).json({'error': 'Username and Password is required'});
    const foundUser = await User.findOne({username: username}).exec();
    if(!foundUser) return res.json({'error': 'No user with entered username! Please register'})
    const match =  await bcrypt.compare(pwd, foundUser.pwd);
    if(match) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn:'1d'});
            
        foundUser.refreshToken = refreshToken;
        const result = foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({"accessToken": accessToken, 'message':'Signed In Sucessfully', 'user':foundUser.username});
    } else {
        res.status(401).json({'error':'Incorect Password'});
    }

}   

module.exports = {handleLogin}