const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Task = require('./models/Task');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const methodOverride = require('method-override');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); // Handle PUT/DELETE with forms
app.use(express.static('public'));

// Session setup
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use(userRoutes);
app.use('/tasks', taskRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
