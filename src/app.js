const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// init middleware
// config log types
app.use(morgan("dev"));
// prevent attack by hiding important header information
app.use(helmet());
// reduce bundle size of sending requests
app.use(compression());
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));

// init database

// init routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Backend NodeJS Architecture!",
  });
});

// handle error

module.exports = app;
