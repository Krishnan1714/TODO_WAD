const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');


// Serve the login page when accessing the root URL
router.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to login page
});

// Register Route
router.get('/register', (req, res) => {
    res.render('register'); // Render the register page
});
router.post('/register', userController.registerUser);

// Login Route
router.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});
router.post('/login', userController.loginUser);

// Logout Route
router.get('/logout', userController.logoutUser);

router.get('/dashBoard',userController.dashBoard)

module.exports = router;
