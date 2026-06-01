import express from 'express';
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updateUserByEmail,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateGithubUrl,
  deleteUser,
  deleteUserByEmail,
  getCurrentUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);
router.get('/me', getCurrentUser);

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/email/:email')
  .get(getUserByEmail)
  .put(updateUserByEmail)
  .delete(deleteUserByEmail);

router.patch('/:id/name', updateName);
router.patch('/:id/email', updateEmail);
router.patch('/:id/password', updatePassword);
router.patch('/:id/phone', updatePhone);
router.patch('/:id/github', updateGithubUrl);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router;