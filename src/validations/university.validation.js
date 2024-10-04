const Joi = require('joi');

const validateUniversity = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    address: Joi.string().min(1).max(255).required(),
    code: Joi.number().integer().required(),
    establishedYear: Joi.number().integer().min(1800).max(new Date().getFullYear()).required(),
    location: Joi.string().min(1).max(255).required(),
    status: Joi.string().valid('active', 'inactive').required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = validateUniversity;
