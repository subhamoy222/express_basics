const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://subhamoysasmal222:kAtfoVbBDY30oiSG@learning.wooluvs.mongodb.net/');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedcourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price:Number,
    imagelink:String
})


const User = mongoose.model('User', UserSchema);     // ✅ schema variable
const Admin = mongoose.model('Admin', AdminSchema);  // ✅
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    User, 
    Admin,
    Course
};