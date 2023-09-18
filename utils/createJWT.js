import jwt from "jsonwebtoken";

const createJWT = ({ payload }) => {
  const token = jwt.sign(
    { userId: payload.user._id, userRole: payload.user.role },
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
  const accessToken = createJWT({ payload: { user } });
  const refreshToken = createJWT({ payload: { user } });
  const lifeTime = 1000 * 60 * 60 * 24 * 30; //30days

  res.cookie("accessToken", accessToken, {
    http: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    http: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    expiresIn: new Date(Date.now() + lifeTime),
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
