import mongoose from "mongoose";
import config from "./config/config.js";

mongoose.set("strictQuery", true);

const db = mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully Connected To Database !");
  })
  .catch((error) => {
    console.log(error.message);
  });

export default db;
