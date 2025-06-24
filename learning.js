const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const jwtsecrte = "1234567890";
const mongoose = require('mongoose');
const zod = require('zod');


function authmiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {   
        return res.status(401).send('Unauthorized: No token provided');
    }
    jwt.verify(token, jwtsecrte, (err, decoded) => {
        if (err) {
            return res.status(403).send('Forbidden: Invalid token');
        }
        req.user = decoded;
        next();
    });
}


app.use(express.json());

app.post('/register',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const personschema = zod.email();
    const response = personschema.safeParse(email);
    if (!response.success) {
        return res.status(400).send('Bad Request: Invalid email format');
    }   
   else{
    return res.send(`User ${name} registered successfully with email ${email}`);
   }

    
});

app.post('/login',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password) {
        return res.status(400).send('Bad Request: Email and password are required');
    }
    else{
        const token  = jwt.sign({email:email},jwtsecrte,{expiresIn:'1h'});
        return res.status(200).json({
            message: `User logged in successfully`,
            token: token    
        })
    }
});

app.get('/profile',authmiddleware, async(req,res)=>{
    const email = req.query.email;
    if(!email){
        return res.status(400).send('Bad Request: Email is required');
    }
    else{
        jwt.verify(req.headers['authorization'],jwtsecrte,(err,decoded)=>{
            if(err){
                return res.status(403).send('Forbidden: Invalid token');
            }
            return res.status(200).json({
                message: `User profile for ${decoded.email}`,
                user: {
                    email: decoded.email
                }
            });
        })
    }
})







app.listen(port);