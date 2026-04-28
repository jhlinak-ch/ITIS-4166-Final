import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignup = [
    body('email')
        .exists({ values: 'falsy' })
        .withMessage('Email is required')
        .bail()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email must be in valid format'),
        

    body('password')
        .exists({ values: 'falsy' })
        .withMessage('Password is required')
        .bail()
        .trim()
        .escape()
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must be at least 8 characters and at most 64 characters'),

    body('role')
        .optional()
        .isIn(['USER', 'ADMIN']),

    handleValidationErrors,
];

export const validateLogin = [
    body('email')
        .exists({ values: 'falsy' })
        .withMessage('Email is required'),

    body('password')
        .exists({ values: 'falsy' })
        .withMessage('Password is required'),

    handleValidationErrors,
];

export const validateUpdate = [
    body('')
];

export const validateUpdateUser = [
  oneOf(
    [
      body('email').exists({ values: 'falsy' }),
      body('password').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (email, password) must be provided' },
  ),

    body('email')
    .optional()
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email must be in valid format'),

  body('password')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be at least 8 characters and at most 64 characters'),

  handleValidationErrors,
];

export const validateRole = [
    body('role')
        .exists({ values: 'falsy' })
        .withMessage('Role is required')
        .bail()
        .isIn([ 'ADMIN', 'USER' ])
        .withMessage('Role must be ADMIN or USER'),

    handleValidationErrors,
]