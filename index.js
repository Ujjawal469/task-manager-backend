const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/route');

app.use(express.json());
app.use("/tasks", router);

mongoose.connect('mongodb://localhost:27017/todo', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});