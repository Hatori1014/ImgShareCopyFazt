const express = require('express');
const exphbs = require('express-handlebars'); 
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');//nos permite unir directorios
const routes = require('../routes/index');


module.exports = app => {

    //settings

    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir : path.join(app.get('views'), 'partials'),
        layoutsDir : path.join(app.get('views'), 'layouts'),
        extname : '.hbs',
        helpers : require('./helpers')
    }));

    app.set('view engine', '.hbs');


    //middlewares

    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended : false}));
    app.use(express.json());
    
    //routes

    routes(app);

    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //errorhandlers

    if ('development' == app.get('env')) {
        app.use(errorHandler);
    }

 
    return app;
}