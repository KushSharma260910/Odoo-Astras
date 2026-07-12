const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/login',
  [
    body('identifier').optional().isString().trim().notEmpty().withMessage('A valid username or email is required'),
    body('email').optional().isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body().custom((value, { req }) => {
      const loginValue = req.body.identifier || req.body.email;
      if (!loginValue || !loginValue.toString().trim()) {
        throw new Error('A valid username or email is required');
      }
      return true;
    }),
  ],
  validationMiddleware,
  authController.login
);

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validationMiddleware,
  authController.register
);

router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.getCurrentUser);
router.put('/me', authMiddleware, authController.updateProfile);

module.exports = router;
