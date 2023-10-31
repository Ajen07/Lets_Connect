import User from "../model/UserSchema.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import { attachCookiesToResponse } from "../utils/createJWT.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import * as fs from "fs";
import { StatusCodes } from "http-status-codes";
import TokenSchema from "../model/TokenSchema.js";

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new BadRequestError("Please provide all the values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("User already exists");
  }
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    profilePicture: picturePath,
    friends,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 1000),
    impressions: Math.floor(Math.random() * 1000),
  });
  res.status(StatusCodes.CREATED).json({ newUser });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("All the fields are required");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new NotFoundError("User doesnot exists");
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new BadRequestError("Password is incorrect");
  }
  user.password = undefined;

  //refresh token
  let refreshToken = "";
  const existingToken = await TokenSchema.findOne({ userId: user._id });
  const currentDate = new Date();
  if (existingToken && existingToken.tokenExpirationDate > currentDate) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new BadRequestError("Invalid Token");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user, refreshToken });
    res.status(StatusCodes.OK).json({ user });
    return;
  }
  refreshToken = crypto.randomBytes(60).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const expiryDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  const tokenExpirationDate = new Date(Date.now() + expiryDate);
  const userToken = {
    refreshToken,
    userAgent,
    ip,
    userId: user._id,
    tokenExpirationDate,
  };

  await TokenSchema.create(userToken);

  attachCookiesToResponse({
    res,
    user: { userId: user._id, userRole: user.role },
    refreshToken,
  });
  res.status(StatusCodes.OK).json({ user });
};
const uploadPicture = async (req, res, next) => {
  if (!req.files) {
    next();
  }

  if (
    req.files &&
    !req.headers["content-type"].startsWith("multipart/form-data")
  ) {
    throw new BadRequestError("Invalid form submission");
  }

  const productImage = req.files?.image;
  if (productImage && !productImage?.mimetype?.startsWith("image")) {
    throw new BadRequestError("Please upload a image");
  }
  if (productImage) {
    const result = await cloudinary.v2.uploader.upload(
      req.files?.image?.tempFilePath,
      {
        use_filename: true,
        folder: "Let's Connect",
      }
    );
    fs.unlinkSync(req.files?.image?.tempFilePath);
    req.body.picturePath = result?.secure_url;
    next();
  }
};
const logoutUser = async (req, res) => {
  await TokenSchema.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
const verifyEmail = async (req, res) => {};

export { register, login, uploadPicture, logoutUser, verifyEmail };
