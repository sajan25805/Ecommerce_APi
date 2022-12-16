import User from "../../models/user.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
const userController = {
  //Inside UserController we are getting Users not creating a new user. Users are created in Register Controller
  async users(req, res, next) {
    try {
      const users = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt -__v" //Hides selected fields and display others!
      );

      if (!users) {
        return next(CustomErrorHandler.notFound());
      }
      return res.json(users);
    } catch (error) {
      return next(error);
    }
  },
};
export default userController;
