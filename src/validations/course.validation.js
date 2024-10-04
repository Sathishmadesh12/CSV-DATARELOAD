const { body, validationResult } = require('express-validator');
const httpStatus = require('http-status');

const validateCourse = [
  body('courseName')
    .notEmpty()
    .withMessage('Course name is required'),
  
  body('courseDescription')
    .notEmpty()
    .withMessage('Course description is required'),

  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),

  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),

  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),

  body('countryId')
    .isInt()
    .withMessage('Country ID must be an integer'),

  body('cityId')
    .isInt()
    .withMessage('City ID must be an integer'),

  body('universityId')
    .isInt()
    .withMessage('University ID must be an integer')
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCourse,
  validateRequest,
};
