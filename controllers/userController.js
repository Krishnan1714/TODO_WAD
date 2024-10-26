const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { username,email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username,email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).send('Error registering user');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid username or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid username or password');

        req.session.userId = user._id;
        res.redirect('/tasks');
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).send('Error logging in');
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
