import express from "express";
import {
  getSingleUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser);
router.route("/:id/friends").get(getUserFriends);
router.route("/:id/:friendId").patch(addRemoveFriend);

export default router;
