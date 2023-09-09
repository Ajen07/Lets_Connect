import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = async (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Route does not exist" });
};

export default notFoundMiddleware;
