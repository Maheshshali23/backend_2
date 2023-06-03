// const { validationResult } = require('express-validator');
// const db = require('../models');
// const { Op } = require('sequelize');
// const User = require('../models/user.model');
// const Comment = require('../models/comment.model');
// const Blog = db.blog;

// exports.createBlogPost = async (req, res) => {
//   try {
//     const { title, content, tags } = req.body;
//     const blogPost = await Blog.create({ title, content, tags });

//     res.status(201).json(blogPost);
//   } catch (error) {
//     console.error('Error creating blog post:', error);
//     res.status(500).json({ message: 'Failed to create blog post.' });
//   }
// };

// exports.updateBlogs = async (req, res) => {
//   try {
//     const { title, content, tags } = req.body;
//     const { id } = req.params;

//     const blogPost = await Blog.findByPk(id);

//     if (!blogPost) {
//       return res.status(404).json({ message: 'Blog post not found.' });
//     }

//     blogPost.title = title;
//     blogPost.content = content;
//     blogPost.tags = tags;

//     await blogPost.save();

//     res.status(200).json(blogPost);
//   } catch (error) {
//     console.error('Error updating blog post:', error);
//     res.status(500).json({ message: 'Failed to update blog post.' });
//   }
// };

// exports.deleteBlogs = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const blogPost = await Blog.findByPk(id);

//     if (!blogPost) {
//       return res.status(404).json({ message: 'Blog post not found.' });
//     }

//     await blogPost.destroy();

//     res.status(204).end();
//   } catch (error) {
//     console.error('Error deleting blog post:', error);
//     res.status(500).json({ message: 'Failed to delete blog post.' });
//   }
// };


// exports.getAllBlogPosts = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, tags, title, author } = req.query;

//     // Create a filter object based on the provided query parameters
//     const filter = {};
//     if (tags) {
//       filter.tags = tags;
//     }
//     if (title) {
//       filter.title = { [Op.like]: `%${title}%` };
//     }
//     if (author) {
//       filter.author = { [Op.like]: `%${author}%` };
//     }

//     // Calculate the offset based on the current page and limit
//     const offset = (page - 1) * limit;

//     // Fetch the blog posts with pagination and filtering
//     const blogPosts = await Blog.findAll({
//       where: filter,
//       offset,
//       limit
//     });

//     res.status(200).json(blogPosts);
//   } catch (error) {
//     console.error('Error fetching blog posts:', error);
//     res.status(500).json({ message: 'Failed to fetch blog posts.' });
//   }
// };

// exports.getBlogPostById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch the blog post by its id
//     const blogPost = await Blog.findOne({
//       where: { id },
//       include: [
//         {
//           model: User,
//           attributes: ['id', 'username', 'email'], // Include author information
//         },
//         {
//           model: Comment, // Include associated comments
//         },
//       ],
//     });

//     if (!blogPost) {
//       return res.status(404).json({ message: 'Blog post not found.' });
//     }

//     res.status(200).json(blogPost);
//   } catch (error) {
//     console.error('Error fetching blog post:', error);
//     res.status(500).json({ message: 'Failed to fetch blog post.' });
//   }
// };


const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Blog, User, Comment } = require('../models');

exports.createBlogPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blogPost = await Blog.create({ title, content, tags });

    res.status(201).json(blogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Failed to create blog post.' });
  }
};

exports.updateBlogs = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { id } = req.params;

    const blogPost = await Blog.findByPk(id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    blogPost.title = title;
    blogPost.content = content;
    blogPost.tags = tags;

    await blogPost.save();

    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Failed to update blog post.' });
  }
};

exports.deleteBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    const blogPost = await Blog.findByPk(id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    await blogPost.destroy();

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Failed to delete blog post.' });
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, tags, title, author } = req.query;

    // Create a filter object based on the provided query parameters
    const filter = {};
    if (tags) {
      filter.tags = tags;
    }
    if (title) {
      filter.title = { [Op.like]: `%${title}%` };
    }
    if (author) {
      filter.author = { [Op.like]: `%${author}%` };
    }

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    // Fetch the blog posts with pagination and filtering
    const blogPosts = await Blog.findAll({
      where: filter,
      offset,
      limit,
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], // Include author information
        },
        {
          model: Comment, // Include associated comments
        },
      ],
    });

    res.status(200).json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts.' });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await Blog.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email'], 
        },
        {
          model: Comment, 
        },
      ],
    });

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post.' });
  }
};
