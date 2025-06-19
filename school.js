const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret  = '123456';

main().catch(err => console.log(err));




app.use(express.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/register' ,async (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send('Bad Request: Email already exists');
    }

    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ name: name , email: email }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({
      message: `User ${name} registered successfully`,
      token: token
    });
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
    
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});