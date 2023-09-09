import Joi from "joi";

const postSchema = Joi.object({
  description: Joi.string().max(1000).required(),
}).options({ allowUnknown: true });

export default postSchema;
