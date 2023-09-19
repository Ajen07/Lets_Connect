import jwt from "jsonwebtoken";

const createJWT = ({ payload }) => {
  const token = jwt.sign(
    {
      userId: payload.user._id,
      userRole: payload.user.role,
      refreshToken: payload.refreshToken,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};

const isTokenValid = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });
  const lifeTime = 1000 * 60 * 60 * 24 * 30; //30days

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    maxAge:  lifeTime,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
