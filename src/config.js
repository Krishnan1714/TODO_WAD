const mongoose = require('mongoose');

// MongoDB connection
const connect = mongoose.connect('mongodb://localhost:27017/todo');

connect.then(() => {
    console.log("MongoDB connected successfully");
}, (err) => {
    console.log(err);
});

// User Schema for login/signup
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});



// Create models
const User = mongoose.model('Users', LoginSchema);

module.exports = User;
