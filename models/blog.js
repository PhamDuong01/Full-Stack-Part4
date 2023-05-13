const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
console.log('connecting to MongoDB', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to Blog List Database');
  })
  .catch((error) => {
    console.log('error connecting to Blog List Database:', error.message);
  });

const blogSchema = new mongoose.Schema({
  title : String,
  author : String,
  url : String,
  likes: Number
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
