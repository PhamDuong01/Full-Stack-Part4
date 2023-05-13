const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const PORT = process.env.PORT || 3001;

//setup morgan to log requests
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`));

//setup cors
app.use(express.json());
// app.use(express.static('build'));
app.use(cors());

//start server

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
