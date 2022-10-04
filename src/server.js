const http = require("http");

require("dotenv").config();

const app = require("./app");
const { startMongoose } = require("./db/mongoDB");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await startMongoose();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
