import RefreshToken from "../../models/refreshToken.js";
import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtService.js";
import config from "../../config/config.js";
import User from "../../models/user.js";

const refreshTokenController = {
  async refresh(req, res, next) {
    //validation
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    let refreshtoken;
    try {
      refreshtoken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });

      if (!refreshtoken) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshtoken.token,
          config.refreshSecret
        );
        userId = _id;
      } catch (err) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return next(CustomErrorHandler.unAuthorized("No user found!"));
      }

      // tokens
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
      return next(new Error("Something went wrong " + err.message));
    }
  },
};

export default refreshTokenController;
