
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
});

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

router.post('update/:active', (req, res) => {
    console.log(req.params);
    Task.update()
});

module.exports = router;