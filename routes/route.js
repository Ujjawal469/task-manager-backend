const express = require('express');
const router  = express.Router();

const Task = require('../models/task.js')

router
    .route("/")
    .post( async (req, res) => {
        try{
            const task = new Task(req.body);
            await task.save();
            res.json({loggedIn: true, status: "everything is ok"});
        }catch(err){
            res.json({loggedIn: false, status: err.message});
        }
    })
    .get(async (req, res) => {
        try{
            const tasks = await Task.find();
            res.json(tasks);
        }catch(err){
            res.json({loggedIn: false, status: err.message});
        }
    });
router
    .route("/:id")
    .get(async(req, res) => {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if(!task ){
                res.json({loggedIn: false, status: "task not found"});
                return;
            }
            res.json(task);
        }catch(err){
            res.json({loggedIn: false, status: err.message});
        }
    })
    .patch(async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowed = ['task_name', 'input_time', 'completed'];
        const isValid = updates.every(update => allowed.includes(update));
        if(!isValid){
            res.json({loggedIn: false, status: "invalid update"});
            return;
        }
        const task = await Task.findById(req.params.id);
        if(!task ){
            res.json({loggedIn: false, status: "task not found"});
            return;
        }
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.json(task);
    }
    catch(err){
        res.json({loggedIn: false, status: err.message});
    }
    })
    .delete(async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.json({loggedIn: true, status: "everything is ok"});
    }catch(err){
        res.json({loggedIn: false, status: err.message});
    }
    
});

module.exports = router;
