const Joi = require('joi');

const validateCountry = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    code: Joi.string().length(3).uppercase().required(), 
    status: Joi.string().valid('active', 'inactive').required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = validateCountry;
