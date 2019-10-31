const path = require('path');//nos permite unir directorios
const morgan = require('morgan');
const express = require('express');
const errorHandler = require('errorhandler');
const exphbs = require('express-handlebars'); 
const multer = require('multer');
// por defecto node busca el archivo index.js, por consiguiente se puede escribir ../routes/index o ../routes
const routes = require('../routes');


module.exports = app => {

    //settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        layoutsDir : path.join(app.get('views'), 'layouts'),
        partialsDir : path.join(app.get('views'), 'partials'),
        helpers : require('./helpers'),
        extname : '.hbs'
    }));
    app.set('view engine', '.hbs');
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));

    //middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended : false}));
    app.use(express.json());
    
    //routes
    routes(app);

    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //errorhandlers
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
 
    return app;
};