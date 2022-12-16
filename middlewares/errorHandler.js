import config from "../config/config.js";

import pkgs from "joi";
const { ValidationError } = pkgs;
import CustomErrorHandler from "../services/CustomErrorHandler.js";

/* Custom Error Handler
Here we have 4 params  (err,req,res,next)
*/

const errorHandler = (error, req, res, next) => {
  //Let's define default Status code .
  let statusCode = 500;

  let data = {
    message: "Internal Error",

    ...(config.debugMode === "true" && { originalError: error.message }),
  };
  console.log(data);

  if (error instanceof ValidationError) {
    //Checks if it's an Validation Error !
    statusCode = 422;
    /*
    422 code is used for validation Error
    */
    data = {
      message: error.message,
      /* It's a validation error so sending original error won't be a problem
       */
    };
  }
  if (error instanceof CustomErrorHandler) {
    statusCode = error.status;
    data = {
      message: error,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
