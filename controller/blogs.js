const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const allBlog = await Blog.find({});
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    content: body.content,
    url: body.url,
    likes: body.likes || 0,
  });

  const saveBlog = await blog.save();
  response.status(201).json(saveBlog);
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
