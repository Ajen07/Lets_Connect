import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../errors/index.js";
import { attachCookiesToResponse, isTokenValid } from "../utils/createJWT.js";
import TokenSchema from "../model/TokenSchema.js";

const authentication = async (req, res, next) => {
  /*   const authHeader = req.headers.authorization;
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
  } */

  /*  if (!tokenUser) {
    throw new UnAuthorizedError("authentication invalid");
  } */
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = { userId: payload.userId, userRole: payload.userRole };
      return next();
    }
    const payload = isTokenValid(refreshToken);
    const existingToken = await TokenSchema.findOne({
      userId: payload.userId,
      refreshToken: payload.refreshToken,
    });
    console.log(existingToken);
    if (!existingToken || !existingToken?.isValid) {
      throw UnAuthorizedError("authentication invalid");
    }
    const user = { userId: payload.userId, userRole: payload.userRole };
    attachCookiesToResponse({ res, user, refreshToken: payload.refreshToken });
    req.user = { userId: payload.userId, userRole: payload.userRole };
    next();
  } catch (error) {
    console.log("hello");
    throw new UnAuthorizedError("authentication invalid");
  }
};

export default authentication;
