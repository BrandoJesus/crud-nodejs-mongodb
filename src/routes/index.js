
const express = require('express');
const router = express.Router();

const Task = require('../models/taks');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    //res.send('Hola Pasuritas!');

    console.log(tasks);
    res.render('index', {
        tasks
    });
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
    // res.send('Received');
})

module.exports = router;