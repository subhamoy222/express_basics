const {User} = require('../db');


async function usermiddleware(req,res,next){
    const username = req.body.username || req.headers['username'];
    const password = req.headers['password'] || req.body.password;
    const value = await User.findOne({
        username: username,
        password: password
    })

    if(value){
        next();
    }
    else{
        const err = new Error('Unauthorized: Invalid Username or Password');
        err.status = 401;
        next(err);
    }


}

module.exports = usermiddleware;