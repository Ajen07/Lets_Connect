import { StatusCodes } from "http-status-codes";
import User from "../model/UserSchema.js";
import { NotFoundError } from "../errors/index.js";

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  res.status(StatusCodes.OK).json({ user });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users, totalUsers: users.length });
};

const getUserFriends = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw NotFoundError(`no user with id:${userId}`);
  }
  const friends = await Promise.all(
    user.friends.map((id) => User.findOne({ _id: id }))
  );
  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, profilePicture, occupation, location }) => {
      return { _id, firstName, lastName, profilePicture, occupation, location };
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ friends: formattedFriends, totalFriends: friends.length });
};

const addRemoveFriend = async (req, res) => {
  const { id: userId, friendId } = req.params;

  const user = await User.findOne({ _id: userId });
  const friend = await User.findOne({ _id: friendId });

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== userId);
  } else {
    user.friends.push(friendId);
    friend.friends.push(userId);
  }
  await user.save();
  await friend.save();

  res.status(StatusCodes.OK).json({ msg: "friends Updated successfully" });
};

export { getSingleUser, getUserFriends, addRemoveFriend, getAllUsers };
