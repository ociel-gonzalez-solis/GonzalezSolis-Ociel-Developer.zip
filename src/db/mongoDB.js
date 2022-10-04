const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const startMongoose = async () => {
  await mongoose.disconnect(MONGO_URI);
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const stopMongoose = async () => {
  await mongoose.disconnect(MONGO_URI);
};

module.exports = { startMongoose, stopMongoose };
