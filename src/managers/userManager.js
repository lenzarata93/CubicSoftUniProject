const User = require('../models/User');
const bcript = require('bcrypt');
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

// return user
return user;
};