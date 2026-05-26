    import express from 'express';
    import { protect, restrictTo } from '../middleware/authMiddleware.js';
    import * as authController from '../controllers/authController.js';

    const router = express.Router();

    router.post('/register', authController.createUser);
    router.post('/login', authController.loginUser);

    router.get('/me', protect, authController.getCurrentUser);
    router.get('/', protect, restrictTo('admin'), authController.getAllUsers);
    router.get('/id/:id', protect, authController.getUserById);
    router.get('/email/:email', protect, authController.getUserByEmail);

    router.put('/:id', protect, authController.updateUser);
    router.put('/email/:email', protect, authController.updateUserByEmail);
    router.patch('/:id/name', protect, authController.updateName);
    router.patch('/:id/email', protect, authController.updateEmail);
    router.patch('/:id/password', protect, authController.updatePassword);
    router.patch('/:id/phone', protect, authController.updatePhone);
    router.patch('/:id/github', protect, authController.updateGithubUrl);

    router.delete('/:id', protect, restrictTo('admin'), authController.deleteUser);
    router.delete('/email/:email', protect, restrictTo('admin'), authController.deleteUserByEmail);

    export default router;