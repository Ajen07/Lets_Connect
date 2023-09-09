import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  location: Joi.string(),
  occupation: Joi.string(),
}).options({ allowUnknown: true });

export default registerSchema;
