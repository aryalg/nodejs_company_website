const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const cors = require('cors');

const AppError = require('./utils/appError');

// Start Express Application from Here.

const app = express();

const vocabRouter = require('./routes/vocabRoutes');

//TODO: GLOBAL MIDDLEWARES

// Implement Cors
app.use(cors());
// Access-Control-Allow-Origin *

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON requests.
app.use(express.json());

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//TODO: VIEW ENGINE

// Using Express Handlebars as view engines
app.engine('handlebars', exphbs({ defaultLayout: 'home' }));
app.set('view engine', 'handlebars');

//TODO: ROUTES
app.use('/api/v1/english/vocab', vocabRouter);

app.get('/', (req, res) => {
  res.render('home/index');
});

app.get('/gre', (req, res) => {
  res.render('home/create_word')
})

app.get('/about', (req, res) => {
  res.render('home/about')
})

app.get('/testing', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'This is awesome'
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
