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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
