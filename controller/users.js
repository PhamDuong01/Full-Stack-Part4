const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
  response.status(200).json(allUsers);
});

userRouter.get('/:id', async (request, response, next) => {
  try {
    const users = await User.findById(request.params.id);
    response.status(200).json(users);
  } catch (exception) {
    next(exception);
  }
});

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (password.split('').length < 3) {
    return response.status(400).json({ message: 'Password is invalid' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  try {
    const user = new User({
      username,
      name,
      passwordHash,
    });
    const saveUser = await user.save();
    response.status(201).json(saveUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
