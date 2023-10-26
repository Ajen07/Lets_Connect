import jwt from "jsonwebtoken";

const createRefreshJWT = ({ payload }) => {
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
const createAccessJWT = ({ payload }) => {
  const token = jwt.sign(
    {
      userId: payload.user._id,
      userRole: payload.user.role,
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
  const accessTokenJWT = createAccessJWT({ payload: { user } });
  const refreshTokenJWT = createRefreshJWT({ payload: { user, refreshToken } });
  const lifeTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

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
    maxAge: lifeTime,
  });
};

export {
  createAccessJWT,
  createRefreshJWT,
  isTokenValid,
  attachCookiesToResponse,
};
