const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.session.userId }).sort('date');

        // Group tasks by date
        const tasksByDate = {};
        const dates = [...new Set(tasks.map(task => task.date))]; // Unique dates

        tasks.forEach(task => {
            if (!tasksByDate[task.date]) {
                tasksByDate[task.date] = [];
            }
            tasksByDate[task.date].push(task);
          

        });
        res.render('index', { tasks, tasksByDate, dates });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Server error');
    }
};


exports.createTask = async (req, res) => {
    const date =req.params.id
    const task = req.body.task;
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
exports.createDate = async (req, res) => {
    const {date} =req.body;
    const task=''
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
        console.error(err)
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

exports.dashBoard =  async (req, res) => {
    try {
        console.log(req.session.userId)
        const tasks = await Task.find({ user: req.user.id }); // Fetch tasks for the logged-in user
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;

        res.render('dashboard', {
            tasks,
            totalTasks,
            completedTasks,
            pendingTasks: totalTasks - completedTasks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}