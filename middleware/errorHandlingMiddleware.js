import { StatusCodes } from "http-status-codes";
const errorHandlingMiddleware = async (err, req, res, next) => {
  const defaultError = {
    errorCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    errorMessage: err.message || "Something went wrong ,Please try again later",
  };
  //JOI validation errors
  if (err.name==="ValidationError" && err.details.length>0) {
    defaultError.statusCode=StatusCodes.BAD_REQUEST
    defaultError.msg =Object.values( err.details)
    .map((item) => item.message)
    .join(",");
  }
  //Mongoose validation errors
  else if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  else if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  res.status(defaultError.errorCode).json({ msg: defaultError.errorMessage });
};
export default errorHandlingMiddleware;
