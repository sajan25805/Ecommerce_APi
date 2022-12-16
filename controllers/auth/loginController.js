import Joi from "joi";
import User from "../../models/user.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtService.js";
import RefreshToken from "../../models/refreshToken.js";
import config from "../../config/config.js";
import bcrypt from "bcrypt";

const loginController = {
  async login(req, res, next) {
    //validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    /* 
    Checking if the users exists
    */

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      // compare the password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      // Token
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        config.refreshSecret
      );
      // database whitelist
      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },

  async logout(req, res, next) {
    const logoutSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = logoutSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      //LogOut means Deleting refreshToken from the Database

      const deletedToken = await RefreshToken.deleteOne({
        token: req.body.refresh_token,
      });

      if (!deletedToken.deletedCount === 1) {
        return next(Error());
      }
      console.log(deletedToken);
      return res.status(204).send();
    } catch (error) {
      next(Error("Something Went wrong in The Database !"));
    }
  },
};

export default loginController;
