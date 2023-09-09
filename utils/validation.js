import registerSchema from "../validationSchema/registerSchema.js";
import postSchema from "../validationSchema/postSchema.js";

const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

export const validateRegister = validation(registerSchema);
export const validatePost = validation(postSchema);
