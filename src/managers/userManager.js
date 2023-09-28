const User = require('../models/User');
const bcript = require('bcrypt');
const jwt = require('../lib/jsonWebToken');
const {SECRET} = require('../config/config');





exports.register = (userData) => User.create(userData);
exports.login = async(username,password)=>{
//ToDo find user
const user = await User.findOne({username});
if(!user){
    throw new Error('Cannot find username or password');
};
//validate pass
const isValid=await bcript.compare(password,user.password);

if(!isValid){
    throw new Error('Cannot find username or password');
}
//create token

const payload = {
    _id: user._id,
    username: user.username,
}
const token = await jwt.sign(payload,SECRET,{expiresIn:'2d'})
// return user
return token;
};