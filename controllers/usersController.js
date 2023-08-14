const User = require('../model/User');

const getAllUsers = async (req, res)=> {

    const users = await User.find();
    console.log(users);
    if(users){
        res.json(users);
    } else {
        res.json({'message': 'No users'});
    }
}



module.exports = {getAllUsers};