import dotenv from "dotenv";
dotenv.config();
export default {
  appPort: process.env.APP_PORT,
  debugMode: process.env.DEBUG_MODE,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  refreshSecret: process.env.REFRESH_SECRET,
};
