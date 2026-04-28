import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { getAllUsersHandler, getCurrentUserHandler, updateCurrentUserHandler, deleteCurrentUserHandler, getAllUserPostsHandler, updateUserRoleHandler } from '../controllers/userController.js';
import { validateUpdateUser, validateRole } from '../middleware/userValidators.js';

const router = express.Router();
router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me', authenticate, getCurrentUserHandler);
router.put('/me', authenticate, validateUpdateUser, updateCurrentUserHandler);
router.delete('/me', authenticate, deleteCurrentUserHandler);
router.get('/me/posts', authenticate, getAllUserPostsHandler);
router.patch('/:id/role', authenticate, authorizeRoles('ADMIN'), validateRole, updateUserRoleHandler);

export default router;