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

test('missing title or url must recieve 400 status', async () => {
  const missTitle = {
    author: 'Author',
    content: 'New content',
    url: 'New URL',
    likes: 0,
  };
  const missUrl = {
    title: 'New Blog',
    author: 'Author',
    content: 'New content',

    likes: 0,
  };

  await api.post('/api/blogs').send(missTitle).expect(400);
  await api.post('/api/blogs').send(missUrl).expect(400);
});

describe('deletion of a Blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const allBlogs = await api.get('/api/blogs');
    const trueIDInDB = allBlogs.body[0].id;
    await api.delete(`/api/blogs/${trueIDInDB}`).expect(204);
  });
  test('failed with status code 404 if id is invalid', async () => {
    const invaledID = '5a3d5da59070081a82a3445';
    await api.delete(`/api/blogs/${invaledID}`).expect(404);
  });
});

describe('updating the number likes of a Blog', () => {
  test('increase like by 1', async () => {
    const allBlogs = await api.get('/api/blogs');
    const updateBlog = {
      ...allBlogs.body[1],
      likes: allBlogs.body[1].likes + 1,
    };
    const trueIDInDB = allBlogs.body[0].id;
    await api.put(`/api/blogs/${trueIDInDB}`).send(updateBlog).expect(200);
  });
  //   test('descrease like by 1', async () => {
  //     const invaledID = '5a3d5da59070081a82a3445';
  //     await api.delete(`/api/blogs/${invaledID}`).expect(404);
  //   });
});

afterAll(async () => {
  await mongoose.connection.close();
});
