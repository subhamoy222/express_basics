const express = require('express');
const router = express.Router();
const {User} = require('../db');
const {Course} = require('../db');
const usermiddleware = require('../middleware/user');

router.post('/signup' , async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    
    await User.create({
        username: username,
        password: password
    })
    res.json({
        message: 'User created successfully',
        username: username
    })
})

router.get('/courses',async(req,res)=>{
    
    const courses = await Course.find();
    res.json({
        message: 'Courses fetched successfully',
        courses: courses
    })
        
})

router.post('/courses/:courseId', async(req,res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username; // Assuming user ID is available in req.user

    await User.updateOne(
        {username: username},
        {$push:
            {purchasedCourses: courseId }
        }
    )
    res.json({
        message: 'Course purchased successfully',
        courseId: courseId
    })
})


router.get('/purchasedCourses', usermiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const username = req.body.username || req.headers.username;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const courses = await Course.find({
            _id: { $in: user.purchasedCourses } // ✅ user's course list
        });

        res.json({
            message: 'Purchased courses retrieved successfully',
            courses
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; // ✅ CORRECT
