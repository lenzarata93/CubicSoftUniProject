const jwt = require('../lib/jsonWebToken');
const {SECRET} = require('../config/config');
      //validate token
exports.auth = async(req,res,next) =>{
    const token = req.cookies['auth'];
    if(token){
        try {
            const user = await jwt.verify(token,SECRET);
            req.user = user;
            next();
            
        } catch (error) {
            res.clearCookie('auth');
           res.redirect('/users/login');
        }
    }else{
        next();
    }

}