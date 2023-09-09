import { UnAuthorizedError } from "../errors/index.js";

export  const checkUserPermissions = (requestUser, userCreater) => {
  if (requestUser.userRole === "admin") {
    return;
  } else if (requestUser.userId === userCreater.toString()) {
    return;
  }
  throw new UnAuthorizedError("Not allowed to access this routes");
};
