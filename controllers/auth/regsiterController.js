import Joi from "joi";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import RefreshToken from "../../models/refreshToken.js";
import config from "../../config/config.js";

const registerController = {
  /* 
  Validation: To use Joi we need to create schema, Let's name it registerSchema
              We have object in Joi, inside it we put the form or body data to validate!
  */

  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
      /*
      Generates a reference to the value of the named key.
      */
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    /* 
    Checking if the users exists
    */
    const { name, email, password } = req.body;

    try {
      const exists = await User.findOne({ email });

      if (exists) {
        return next(
          CustomErrorHandler.alreadyExist("Credentials already in Use !")
        );
        //Sending error Inside of It ! Using Custom Error Handler !
      }
    } catch (error) {
      return next(error);
    }

    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    let access_token;
    let refresh_token;
    try {
      const result = await user.save();
      console.log(result);

      // Token
      access_token = JwtService.sign({
        _id: savedUser._id,
        role: savedUser.role,
      });

      refresh_token = JwtService.sign(
        { _id: savedUser._id, role: savedUser.role },
        "48hr",
        config.refreshSecret
      );
      // database whitelist
      await RefreshToken.create({ token: refresh_token });
    } catch (error) {
      return next(error);
    }

    res.json({ access_token, refresh_token });
  },
};
export default registerController;
