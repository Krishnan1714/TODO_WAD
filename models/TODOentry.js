const mongoose = require('mongoose');
const TODOentry = new mongoose.Schema(
    {
        user: {  // Reference to the user who owns this task
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date : {
            type: Date,
            required: true

        },
        incomplete : [String],
        complete : [String]
});
module.exports = mongoose.model('TODOentry',TODOentry);