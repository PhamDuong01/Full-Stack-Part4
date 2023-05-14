const listHelper = require('../ultils/list_helper');
const blogslist = [
  {
    title: '1 A',
    author: 'John',
    likes: 1,
  },
  {
    title: '2 A',
    author: 'Doe',
    likes: 1,
  },
  {
    title: '3 A',
    author: 'My',
    likes: 1,
  },
  {
    title: '4 A',
    author: 'Doe',
    likes: 1,
  },
  {
    title: '5 A',
    author: 'John',
    likes: 1,
  },
  {
    title: '6 A',
    author: 'My',
    likes: 1,
  },
  {
    title: '7 A',
    author: 'My',
    likes: 1,
  },
  {
    title: '8 A',
    author: 'John',
    likes: 1,
  },
  {
    title: '9 A',
    author: 'Doe',
    likes: 1,
  },
  {
    title: '10 A',
    author: 'My',
    likes: 1,
  },
  {
    title: '11 A',
    author: 'Doe',
    likes: 1,
  },
  {
    title: '12 A',
    author: 'John',
    likes: 1,
  },
  {
    title: '13 A',
    author: 'My',
    likes: 1,
  },
  {
    title: '14 A',
    author: 'My',
    likes: 1,
  },
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];
  const listWithMoreBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('of a bigger list is calculate right', () => {
    const result = listHelper.totalLikes(listWithMoreBlog);
    expect(result).toBe(15);
  });
});
describe('Most likes of Blogs', () => {
  test('of a most likes of blogs', () => {
    const listWithMoreBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: '1 Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: '2 Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: '3 Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0,
      },
    ];
    const expected = {
      title: listWithMoreBlog[2].title, //3 Go To Statement Considered Harmful
      author: listWithMoreBlog[2].author, //Edsger W. Dijkstra
      likes: listWithMoreBlog[2].likes, //12
    };

    const result = listHelper.favoriteBlog(listWithMoreBlog);
    expect(result).toEqual(expected);
  });
  test('of author have most Blogs', () => {
    const result = listHelper.authorBlogAndLike(blogslist);
    const expected = {
      author: 'My',
      blogs: 6,
    };
    expect(result.blog).toEqual(expected);
  });
  test('of author have most likes', () => {
    const result = listHelper.authorBlogAndLike(blogslist);
    console.log(result);
    const expected = {
      author: 'My',
      likes: 6,
    };
    expect(result.like).toEqual(expected);
  });
});
