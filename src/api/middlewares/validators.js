/**
 * @file Contains all validation middleware for incoming requests.
 */

const { body, validationResult } = require('express-validator');

/**
 * A middleware that checks for validation errors and sends a 400 response if any exist.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Validation rules for creating a new task.
 * All fields are required.
 */
const createTaskValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required and cannot be empty'),

  body('priority')
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),

  body('deadline')
    .isISO8601()
    .toDate()
    .withMessage('Deadline must be a valid ISO 8601 date'),

  handleValidationErrors,
];

/**
 * Validation rules for updating an existing task.
 * All fields are optional, but if provided, they must be valid.
 */
const updateTaskValidator = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),

  body('deadline')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Deadline must be a valid ISO 8601 date'),
    
  handleValidationErrors,
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
};
