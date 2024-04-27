const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    rollNumber: Number,
    registrationNumber: Number,
    mobileNumber: Number,
    gender: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;