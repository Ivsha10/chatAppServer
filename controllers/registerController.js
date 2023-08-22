const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async function(req, res) {

    const imageName = req.file.filename;
    console.log(imageName);
    const {username, pwd, fullName, phoneNumber} = req.body;
    const duplicate = await User.findOne({username: username}).exec();
    if (duplicate)  return res.json({error: 'This Username already exists'});
    const result = await User.create({
        'username': username,
        'pwd': await bcrypt.hash(pwd, 10),
        'fullName': fullName,
        'phoneNumber': phoneNumber,
        'imageBase':imageName
    });
    console.log(result);
    return res.status(200).json({message: `User ${username} successfuly registered!`})
}

module.exports = {handleNewUser};