const path = require('path');

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

const petsRoutes = require("./routes/pets.routes");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const specs = swaggerJsDoc(options);

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use("/api/v1/pets", petsRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
