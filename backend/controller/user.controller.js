import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists with this email!', 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
  const userData = {
    ...req.body,
    password: hashedPassword
  };

  const newUser = await User.create(userData);
  
  newUser.password = undefined;

  res.status(201).json({
    success: true,
    message: 'User created successfully!',
    data: newUser
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

export const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID', 400));
  }

  const user = await User.findById(id).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    data: user
  });
});

export const getUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;
  
  const user = await User.findOne({ email }).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    data: user
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID', 400));
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }

  const user = await User.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'User updated successfully!',
    data: user
  });
});

export const updateUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;
  
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }

  const user = await User.findOneAndUpdate(
    { email },
    req.body,
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'User updated successfully!',
    data: user
  });
});

export const updateName = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (!name) {
    return next(new AppError('Name is required', 400));
  }

  const user = await User.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'Name updated successfully!',
    data: { name: user.name }
  });
});

export const updateEmail = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  
  if (!email) {
    return next(new AppError('Email is required', 400));
  }

  const existingUser = await User.findOne({ email, _id: { $ne: id } });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  const user = await User.findByIdAndUpdate(
    id,
    { email },
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'Email updated successfully!',
    data: { email: user.email }
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return next(new AppError('Current password and new password are required', 400));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError('Current password is incorrect', 401));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  
  user.password = hashedPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password updated successfully!'
  });
});

export const updatePhone = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { phone } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { phone },
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'Phone updated successfully!',
    data: { phone: user.phone }
  });
});

export const updateGithubUrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { githubUrl } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { githubUrl },
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'GitHub URL updated successfully!',
    data: { githubUrl: user.githubUrl }
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID', 400));
  }

  const user = await User.findByIdAndDelete(id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'User deleted successfully!'
  });
});

export const deleteUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOneAndDelete({ email });
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    message: 'User deleted successfully!'
  });
});

export const getCurrentUser = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const user = await User.findById(decoded.id).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json({
    success: true,
    data: user
  });
});