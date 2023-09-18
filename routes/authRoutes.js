import express from "express";
import {
  login,
  logoutUser,
  register,
  uploadPicture,
} from "../controllers/authController.js";
import { validateRegister } from "../utils/validation.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

router.route("/register").post(validateRegister, uploadPicture, register);
router.route("/login").post(login);
router.route("/logout").post(authentication, logoutUser);

export default router;
