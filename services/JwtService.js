import config from "../config/config.js";
import jwt from "jsonwebtoken";

//creating jwt token
class JwtService {
  static sign(payload, expiry = "1hr", secret = config.jwtSecret) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = config.jwtSecret) {
    return jwt.verify(token, secret);
  }
}
export default JwtService;
