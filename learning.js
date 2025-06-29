const express = require('express');
const app = express();
const port = 3000;
const zod = require('zod');
const jwt = require('jsonwebtoken');
const jwtsecret = "1234567890";

app.use(errormiddleware);
app.use(express.json());
function authenticationmiddleware(req,res,next){
    const name = req.body.name;
    const password = req.body.password;
    const schema = zod.string().min(8).max(20);
    const response = schema.safeParse(password);
    if(!response.success){
        err = new error('Bad Request: Invalid Password');
        err.status = 400;
    }
    else{
        const jwttoken = jwt.sign({name:name},jwtsecret,{expiresIn:1000});
        res.setHeader('Authorization' , `Bearer ${jwttoken}`);
        next();

    }

}


app.post('/', authenticationmiddleware, (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    res.send(`Token: ${token}, Name: ${req.body.name}`);
});

function errormiddleware(err,req,res,next){
    if(err.status === 400){
        res.send('Bad Request: Invalid Password');
    }
    else{
        res.status(500).send(`Error: ${err.message}`);
    }
}

app.listen(port);