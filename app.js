const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./routes/projectRoutes');
// const userRouter = require('./routes/userRoutes');

const app = express();

//! Middleware...
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('hello from the middleware! 🤘');
  next();
});

//? This middleware function will add a time to all of the routes.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//! Mounting Routers
//% Mounting the Project Routers
app.use('/api/v1/projects', projectRouter);

//% Mounting the User Routers
// app.use('/api/v1/users', userRouter);

module.exports = app;
