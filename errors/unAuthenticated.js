import { StatusCodes } from "http-status-codes";
class UnAuthorizedError extends Error{
    constructor(message){
        super(message);
        this.statusCode=StatusCodes.FORBIDDEN;
    }
}

export default UnAuthorizedError;