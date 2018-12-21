
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

router.get('/edit/:id', async (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    const task = await Task.findById(id);
    console.log(task);
    res.render('edit', {
        task
    });
});

router.post('/edit/:id', async (req, res) =>{
    const {id} = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

router.post('/search', async (req, res) => {
    // const task = new Task(req.body);
    console.log('req.body ', req.body);
    const { title } = req.body;
    console.log('title ', title);
    const tasks = await Task.find({"title": title});
    
    console.log('tasks ', tasks);
    if(tasks.length){
        res.render('index', {
            tasks
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;