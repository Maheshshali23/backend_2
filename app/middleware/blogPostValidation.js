const { body, query } = require('express-validator');

// Validate blog post input
exports.validateBlogPost = [
  body('title').notEmpty().withMessage('Title is required.'),
  body('content').notEmpty().withMessage('Content is required.'),
  query('page').optional().isInt().withMessage('Page must be an integer.'),
  query('limit').optional().isInt().withMessage('Limit must be an integer.'),
  query('tags').optional().isString().withMessage('Tags must be a string.'),
  query('title').optional().isString().withMessage('Title must be a string.'),
  query('author').optional().isString().withMessage('Author must be a string.')
];
