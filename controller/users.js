const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const allusers = await User.find({});
  response.status(200).json(allusers);
});

userRouter.get('/:id', async (request, response) => {
  const users = await User.findById(request.params.id);
  if (users) {
    response.json(users);
  } else {
    response.status(404).end();
  }
});

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const saveUser = await user.save();
  response.status(201).json(saveUser);
});

// userRouter.delete('/:id', async (request, response, next) => {
//   try {
//     await Blog.findByIdAndRemove(request.params.id);
//     response.status(204).end();
//   } catch (exception) {
//     next(exception);
//   }
// });

// userRouter.put('/:id', async (request, response, next) => {
//   const body = await request.body;
//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   };
//   try {
//     const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
//     response.status(200).json(updateBlog);
//   } catch (exception) {
//     next(exception);
//   }
// });

module.exports = userRouter;
