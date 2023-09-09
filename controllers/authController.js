import User from "../model/UserSchema.js";
import cloudinary from "cloudinary";
import createJWT from "../utils/createJWT.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import * as fs from "fs";
import { StatusCodes } from "http-status-codes";

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
    throw NotFoundError("User doesnot exists");
  }
  const passwordMatch = await user.comparePassword(password);
  console.log(passwordMatch);
  if (!passwordMatch) {
    throw new BadRequestError("Password is incorrect");
  }
  user.password = undefined;
  const token = createJWT(user);
  res.status(StatusCodes.OK).json({ user, token });
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

export { register, login, uploadPicture };
