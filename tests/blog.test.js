const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('../ultils/blog_helper');

const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogOjects = new Blog(helper.iniBlogs[0]);
  await blogOjects.save();

  blogOjects = new Blog(helper.iniBlogs[1]);

  await blogOjects.save();
});

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the unique identifier property of the blog posts is named id', async () => {
  const defineBlog = await api.get('/api/blogs');
  defineBlog.body.map((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('creates a new blog post', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Author',
    content: 'New content',
    url: 'New URL',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const allBlog = await api.get('/api/blogs');
  expect(allBlog.body).toHaveLength(helper.iniBlogs.length + 1);

  const contents = allBlog.body.map((blog) => blog.content);
  expect(contents).toContain(newBlog.content);
});

test('the likes property is missing will default value 0', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Author',
    content: 'New content',
    url: 'New URL',
  };
  const responseBlog = await api.post('/api/blogs').send(newBlog);

  expect(responseBlog.body.likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
