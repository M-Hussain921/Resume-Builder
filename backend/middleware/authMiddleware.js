import jwt from 'jsonwebtoken';
import util from 'util';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select('-password');
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const optionalAuth = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id).select('-password');
      if (currentUser) {
        req.user = currentUser;
      }
    } catch (error) {
    }
  }
  next();
});

export const checkOwnership = (model, paramIdField = 'id') => {
  return catchAsync(async (req, res, next) => {
    const resourceId = req.params[paramIdField];
    const resource = await model.findById(resourceId);

    if (!resource) {
      return next(new AppError('Resource not found', 404));
    }

    if (resource.userId && resource.userId.toString() !== req.user.id) {
      return next(new AppError('You do not have permission to access this resource', 403));
    }

    req.resource = resource;
    next();
  });
};

export const rateLimitByUser = () => {
  const requests = new Map();

  return (req, res, next) => {
    const userId = req.user?.id || req.ip;
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 30;

    if (!requests.has(userId)) {
      requests.set(userId, []);
    }

    const userRequests = requests.get(userId);
    const validRequests = userRequests.filter(time => now - time < windowMs);
    validRequests.push(now);
    requests.set(userId, validRequests);

    if (validRequests.length > maxRequests) {
      return next(new AppError('Too many requests. Please try again later.', 429));
    }

    next();
  };
};