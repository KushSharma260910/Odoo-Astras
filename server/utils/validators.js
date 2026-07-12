const { body } = require('express-validator');

const loginValidation = [
  body('identifier').optional().isString().withMessage('A valid username or email is required'),
  body('email').optional().isEmail().withMessage('A valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['ADMIN', 'FLEET_MANAGER', 'DISPATCHER', 'DRIVER', 'MECHANIC', 'SAFETY_OFFICER', 'FINANCIAL_ANALYST']),
];

module.exports = { loginValidation, registerValidation };
