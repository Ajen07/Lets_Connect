import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../errors/index.js";

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader && !authHeader.startsWith("Bearer")) {
    throw new UnAuthorizedError("user is not authenticated");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthorizedError("authentication invalid");
  }
};

export default authentication;
