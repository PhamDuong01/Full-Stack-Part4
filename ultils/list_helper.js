const { set } = require('../app');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  let curLike = 0;
  let result = {};
  blogs.forEach((blog) => {
    if (curLike < blog.likes) {
      curLike = blog.likes;
      result = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });
  return result;
};

const authorBlogAndLike = (blogs) => {
  const listBlogInfo = {};
  const listLikeInfo = {};
  let authorBlog = '';
  let maxNumBlog = 0;
  let authorLike = '';
  let maxNumLike = 0;
  //listdown blog and like info
  blogs.forEach((blog) => {
    const author = blog.author;
    if (listBlogInfo[author]) {
      listBlogInfo[author]++;
      listLikeInfo[author] += blog.likes;
    } else {
      listBlogInfo[author] = 1;
      listLikeInfo[author] = blog.likes;
    }
  });
  // find author have most blog
  for (const author in listBlogInfo) {
    if (listBlogInfo[author] > maxNumBlog) {
      maxNumBlog = listBlogInfo[author];
      authorBlog = author;
    }
  }
  // find author have most like
  for (const author in listLikeInfo) {
    if (listLikeInfo[author] > maxNumLike) {
      maxNumLike = listLikeInfo[author];
      authorLike = author;
    }
  }
  return (a = {
    blog: { author: authorBlog, blogs: maxNumBlog },
    like: { author: authorLike, likes: maxNumLike },
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorBlogAndLike,
};
