const logger = require('./logger');
const config = require('./config');

const requestLogger = (request, response, next) => {
  logger.infoLog('Method:', request.method);
  logger.infoLog('Path:  ', request.path);
  logger.infoLog('Body:  ', request.body);
  logger.infoLog('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error.message);
  // logger.errorLog(error.name);

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
