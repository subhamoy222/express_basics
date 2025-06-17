const express = require('express');
const app = express();
const port = 3000;

let student = [{
    name: "subhamoy",
    age: 20,
    college :[{
        name1:"NIT Warangal",
        year: 2023,
        courses: ["CSE", "ECE", "ME"],
        rollno:49
    }]
    
},{name: "subhamoy sasmal",
    age: 20,
    college :[{
        name1:"NIT Warangal",
        year: 2023,
        courses: ["CSE", "ECE", "ME"],
        rollno:49
    }]
}];

app.use(express.json());

app.get('/',(req,res) =>{
    let name = req.query.name
    if(name === "subhamoy"){
        res.send(`Hello ${name}, welcome to the college portal!`);
        
    } else {
        res.send(`Hello ${name}, you are not registered in our system.`);
    }                                                                       

});

app.post('/', (req, res) => {
console.log("Request body is:", req.body);
  const newstudent = req.body;

  if (newstudent.name !== "subhamoy") {
    student.push(newstudent);
    res.send(`New student added: ${newstudent.name}`);
  } else {
    res.status(400).send('Error: Student already exists or name is invalid');
  }
});


app.listen(port);