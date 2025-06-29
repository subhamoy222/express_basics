const {Admin} = require('../db');


async function adminmiddleware(req,res,next){
    const username = req.headers['username'];
    const password = req.headers['password'];
    const value = await Admin.findOne({
        username: username,
        passowrd: password
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

module.exports = adminmiddleware;