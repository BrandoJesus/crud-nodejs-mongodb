const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//connection to db :: newversion { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/crud-mongo', { useNewUrlParser: true })
.then( db => console.log('Db conected'))
.catch( err => console.log('err ', err));

//import routes
const indexRoutes = require('./routes/index.js');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares: funcion que se ejecuta antes de llegar alas rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port') , () => {
    console.log(`Server on port ${app.get('port')}`);
});