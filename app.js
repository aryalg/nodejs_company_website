const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Start Express Application from Here.

const app = express();

const vocabRouter = require('./routes/vocabRoutes');
const homeRouter = require('./routes/homeRoutes');
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');

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

//TODO: API ROUTES
app.use('/api/v1/english/vocab', vocabRouter);
app.use('/api/v1/users', userRouter);

//TODO: VIEW ROUTES
app.use('/', homeRouter);
app.use('/admin', adminRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
