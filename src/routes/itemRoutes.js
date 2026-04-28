import express from 'express';
import {
  getAllItemsHandler,
  getItemByIdHandler,
  createItemHandler,
  updateItemHandler,
  deleteItemHandler,
} from '../controllers/itemController.js';

import {
  validateId,
  validateCreateItem,
  validateUpdateItem,
  validateItemQuery,
} from '../middleware/itemValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', validateItemQuery, getAllItemsHandler);
router.get('/:id', validateId, getItemByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'),  validateCreateItem, createItemHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateId, validateUpdateItem, updateItemHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateId, deleteItemHandler);

export default router;
