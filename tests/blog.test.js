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

afterAll(async () => {
  await mongoose.connection.close();
});
