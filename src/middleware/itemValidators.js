import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateItem = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  body('price')
    .exists({ values: 'falsy' })
    .withMessage('Price is required')
    .bail()
    .trim()
    .escape()
    .isDecimal()
    .withMessage('Price must be a decimal'),

  handleValidationErrors,
];

export const validateUpdateItem = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('price').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, price) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  body('price')
    .optional()
    .trim()
    .escape()
    .isDecimal()
    .withMessage('Price must be a decimal'),

  handleValidationErrors,
];

export const validateItemQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'price'])
    .withMessage('sortBy must be one of id, name, price'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be an integer between 1 and 50'),

  handleValidationErrors,
];
