const mongoose = require('mongoose');
const bcript = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
   
    },

});

userSchema.virtual('repeatPassword')
.set(function(value){
    if(value !== this.password){
        throw new mongoose.MongooseError('Password missmatch...')
    }
});

userSchema.pre('save',async function(){
    const hash =await bcript.hash(this.password,10);

    this.password = hash;
})
const User= mongoose.model('User',userSchema);
module.exports = User;