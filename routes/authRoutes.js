import express from "express";
import {
  login,
  register,
  uploadPicture,
} from "../controllers/authController.js";
import { validateRegister } from "../utils/validation.js";

const router = express.Router();

router.route("/register").post(validateRegister, uploadPicture, register);
router.route("/login").post(login);

export default router;
