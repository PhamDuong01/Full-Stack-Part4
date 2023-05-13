const express = require('express');
const app = express();
const cors = require('cors');
// const morgan = require('morgan');
const { url } = require('./ultils/config');
const { infoLog, errorLog } = require('./ultils/logger');
const { requestLogger, unknownEndpoint, errorHandler } = require('./ultils/middleware');
const blogsRouter = require('./controller/blogs');
const mongoose = require('mongoose');

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

app.use('/api/blogs', blogsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
