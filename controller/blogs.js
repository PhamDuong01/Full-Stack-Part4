const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const allBlog = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.status(200).json(allBlog);
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.url) {
    response.status(400).end();
    return;
  }
  const user = await User.findById(body.id);
  if (!user) return response.status(400).end();

  const blog = new Blog({
    title: body.title,
    author: body.author,
    content: body.content,
    url: body.url,
    likes: body.likes || 0,
    user: body.id,
  });

  const saveBlog = await blog.save();
  user.blogs = user.blogs.concat(saveBlog.id);
  await user.save();
  response.status(201).json(saveBlog);
});
//delete all blog
blogsRouter.delete('/', async (request, response, next) => {
  await Blog.deleteMany({});
  response.status(204).end();
  // try {
  //   await Blog.findByIdAndRemove(request.params.id);
  //   response.status(204).end();
  // } catch (exception) {
  //   next(exception);
  // }
});
//delete one blog
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = await request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.status(200).json(updateBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
