import config from "./app/config/index.js";
import mongoose from "mongoose";
import app from "./app.js";

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

main();
