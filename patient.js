const express = require("express");
const zod = require("zod");
const app = express();
const port = 3000;
app.use(express.json());
const schema = zod.number();
function namemiddleware(req,res,next){
    let name = req.headers['name'];
    const response = schema.safeParse(name);
    if(!response.success){
        const err = new Error('Bad Request: Invalid Name');
        err.status = 400;
        next(err);
        return;
    }   
    if(name!= "subhamoy"){
        const err = new Error('Unauthorized: Invalid Name');
        err.status = 401;
        next(err);
    }
    else{
        next();
    }
};
function passwordmiddleware(req,res,next){
    let password = req.headers.password;
    if(password != "pass"){
        res.status(401).send('Unauthorized: Invalid Password');
    }
    else{
        next();
    }   
};
 app.get('/' ,namemiddleware,passwordmiddleware,(req,res) =>{
    
    
    const kidneyId = parseInt(req.query.kidneyId);
    
    if(kidneyId != 1 && kidneyId != 3){
        return res.status(400).send('Bad Request: Invalid Kidney ID');
    }
    else{
        res.send(`Patient: ${req.headers.name}, Kidney ID: ${kidneyId} record updated successfully`);

    }   

 });

 app.use((err,req,res,next) =>{
    res.status(500).send(`Error: ${err.message}"}`);
 });
 app.listen(port);