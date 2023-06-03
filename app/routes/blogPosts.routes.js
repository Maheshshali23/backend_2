const { validateBlogPost } = require('../middleware/blogPostValidation');
const blogController = require('../controllers/blogController');

module.exports = (app) => {
  app.get('/api/blog-posts', validateBlogPost, blogController.getAllBlogPosts);
  app.post('/api/blog-posts', validateBlogPost, blogController.createBlogPost);
  app.put('/api/blog-posts/:id', validateBlogPost, blogController.updateBlogs);
  app.delete('/api/blog-posts/:id', blogController.deleteBlogs);
  app.get('/api/blog-posts/:id', blogController.getBlogPostById);
};
