// Import modules
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
var methodOverride = require('method-override');
const path = require('path');
const route = require('./routes');

const sortMiddleware = require('./app/middlewares/sortMiddleware');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})); // encoding form data
app.use(express.json());

// Local port
const port = process.env.PORT || 3000;

// Method override
app.use(methodOverride('_method'))

// Middlewares
app.use(sortMiddleware);

// Template engine
app.engine(
    'hbs', exphbs({ 
        extname: ".hbs",  // Define engine
        helpers: require('./app/helpers/handlebars') // Add helpers for handlebars
    }));

app.set('view engine', 'hbs'); // Set view engine
app.set('views', path.join(__dirname, 'resources', 'views'));

// Initialize routes
route(app);

// Connect database
const mongoDB = require("./config/db");
mongoDB.connect();

app.listen(port, () => {
    console.log(`Local app listening at http://localhost:${port}`)
});
