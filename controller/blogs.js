const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const allBlog = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.status(200).json(allBlog);
});

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    return response.status(200).json(blog);
  }
  return response.status(400).json({ message: 'This Blog is not exist in system' });
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  if (!body.title || !body.url) {
    response.status(400).send({ message: 'title or url not provided' });
    return;
  }

  try {
    const token = request.token;

    const user = await User.findById(token.id);
    if (!user) return response.status(400).end();

    const blog = new Blog({
      title: body.title,
      author: body.author,
      content: body.content,
      url: body.url,
      likes: body.likes || 0,
      user: token.id,
    });

    const saveBlog = await blog.save();
    user.blogs = user.blogs.concat(saveBlog.id);
    await user.save();
    response.status(201).json(saveBlog);
  } catch (exception) {
    next(exception);
  }
});
//delete all blog for test
blogsRouter.delete('/', async (request, response, next) => {
  await Blog.deleteMany({});
  response.status(204).json({ message: 'All blogs are deleted' });
});
//delete one blog
blogsRouter.delete('/:id', async (request, response, next) => {
  const blogID = await request.params.id;
  const token = request.token;
  if (!token) {
    return response.status(401).json({ message: 'No Token available' });
  }
  try {
    const deletekUser = await User.findById(token.id);
    const deleteBlog = await Blog.findById(blogID).populate('user', { user: 1 });
    if (!deleteBlog) {
      return response.status(400).json({ message: 'This Blog is not exist in system' });
    }

    //check three varible id
    if (!(token.id === deletekUser.id && token.id === deleteBlog.user.id)) {
      return response.status(401).json({ message: 'you are not allowed to delete this blog' });
    }
    await Blog.findByIdAndRemove(blogID);

    //remove blog of bloglist in user data
    const blogsRemain = deletekUser.blogs.filter((blog) => {
      return blog.toString() !== blogID;
    });
    deletekUser.blogs = blogsRemain;
    deletekUser.save();

    return response.status(200).json({ message: 'Blog is deleted successfully' });
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
