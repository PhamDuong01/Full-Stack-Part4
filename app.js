const express = require('express');
const app = express();
const cors = require('cors');
// const morgan = require('morgan');
const { url } = require('./ultils/config');
const { infoLog, errorLog } = require('./ultils/logger');
const { requestLogger, unknownEndpoint, errorHandler } = require('./ultils/middleware');
const mongoose = require('mongoose');
const userRouter = require('./controller/users');
const blogRouter = require('./controller/blogs');
const loginRouter = require('./controller/login');

infoLog('connecting to database', url);
mongoose
  .connect(url)
  .then((result) => {
    infoLog('connected to Database');
  })
  .catch((error) => {
    errorLog('error connecting to Blog List Database:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

//setup morgan to log requests
// morgan.token('body', function (req, res) {
//   return JSON.stringify(req.body);
// });
// app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`));

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
