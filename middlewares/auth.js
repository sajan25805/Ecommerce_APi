import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

const auth = async (req, res, next) => {
  //get token from header

  let authHeader = req.headers.authorization;
  // console.log({ authHeader });

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  // Remove `Bearer` from token
  const token = authHeader.split(" ")[1];
  // console.log(token);

  try {
    const { _id, role } = JwtService.verify(token);

    const user = { _id, role };
    req.user = user;

    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

export default auth;
