const mongoose = require('mongoose')

const TaskWay = new mongoose.Schema({
    task_name:{
        type:String,
        required:true
    },
    input_time:{
        type:String,
        required:true
    },
    completed: {
        type:Boolean,
        default:false
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('Task', TaskWay);