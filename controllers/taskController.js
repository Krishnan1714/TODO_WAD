const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.session.userId }).sort('date');
        res.render('index', { tasks });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.createTask = async (req, res) => {
    const { task, date } = req.body;
    try {
        const newTask = new Task({
            task,
            date,
            user: req.session.userId
        });
        await newTask.save();
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).send('Error creating task');
    }
};

exports.completeTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, { completed: true });
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).send('Error completing task');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).send('Error deleting task');
    }
};
