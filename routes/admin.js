const express = require('express');
const router = express.Router();
const {Admin} = require('../db');
const {Course} = require('../db');
const adminmiddleware = require('../middleware/admin');

router.post('/signup' , async(req, res)=>{
    const { username, password } = req.body;

    // Optional: Check if username/password are missing
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: 'Admin created successfully',
        username: username
    })
})

router.post('/course', async(req,res)=>{
    const title= req.body.title;
    const description=req.body.description;
    const price = req.body.price;
    const imagelink =req.body.imagelink;

    await Course.create({
        title:title,
        description: description,
        price:price,
        imagelink:imagelink

    })

    res.json({
        message: 'Course created successfully'
        
    })
});

router.get('/courses', async(req,res)=>{
    const courses = await Course.find({});
    res.json({
        message: 'Courses retrieved successfully',
        courses: courses.map(course => ({
            title: course.title,
            description: course.description,
            price: course.price,
            imagelink: course.imagelink,
            courseId: course._id
        }))
    })
})



module.exports = router; // ✅ CORRECT
