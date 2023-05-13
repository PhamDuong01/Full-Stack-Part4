const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
console.log('connecting to PhoneBook MongoDB', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to PhoneBook MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to PhoneBook MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: 'string',
    minLength: 3,
    require: true,
  },
  number: {
    type: 'string',
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{2}-\d{8}/.test(v) || /\d{3}-\d{7}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
