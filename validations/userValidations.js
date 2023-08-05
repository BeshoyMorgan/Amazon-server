const { check, body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validation');
const User = require('../models/user');




exports.createUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('User required')
    .isLength({ min: 3 })
    .withMessage('Too short User name'),

  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((email) =>
      User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email is already exist'));
        }
      })
    ),

  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error('invalid Password Confirm');
      }
      return true;
    }),

  check('confirmPassword')
    .notEmpty()
    .withMessage('confirm Password required'),

  validatorMiddleware,
];


exports.loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),

  check('password')
    .notEmpty()
    .withMessage('Password required'),

  validatorMiddleware,
];


exports.updateUserValidator = [
    check('name')
      .optional() 
      .isLength({ min: 3 })
      .withMessage('Too short User name'),
  
    body('email')
      .optional() 
      .isEmail()
      .withMessage('Invalid email address')
      .custom((val) =>
        User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(new Error('E-mail already in user'));
          }
        })
      ),
    validatorMiddleware,
  ];
  

exports.changeUserPasswordValidator = [
    body('password')
      .notEmpty()
      .withMessage('You must enter your current password'),
    body('confirmNewPassword')
      .notEmpty()
      .withMessage('You must enter the confirm new password'),
    body('newPassword')
      .notEmpty()
      .withMessage('You must enter new password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .custom(async (password, { req }) => {  
        if (password !== req.body.confirmNewPassword) {
            throw new Error('invalid Password Confirm');
          }
          return true;
      }),
    validatorMiddleware,
  ];


  exports.forgotPasswordValidator = [
    body('confirmNewPassword')
      .notEmpty()
      .withMessage('You must enter the confirm new password'),
    body('newPassword')
      .notEmpty()
      .withMessage('You must enter new password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .custom(async (password, { req }) => {  
        if (password !== req.body.confirmNewPassword) {
            throw new Error('invalid Password Confirm');
          }
          return true;
      }),
    validatorMiddleware,
  ];

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];


