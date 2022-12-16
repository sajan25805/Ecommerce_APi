import app from "./app.js";
import connection from "./database.js";
import config from "./config/config.js";

app.listen(config.appPort, async () => {
  await connection;
  console.log(`Successfully Connected To Port ${config.appPort}`);
});
