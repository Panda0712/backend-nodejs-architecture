const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { countConnect, checkOverload } = require("./helpers/check.connect");

const app = express();

// init middleware
// config log types
app.use(morgan("dev"));
// prevent attack by hiding important header information
app.use(helmet());
// reduce bundle size of sending requests
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));

// init database
require("./db/init.mongodb");
countConnect();
// checkOverload();

// init routes
app.use("/", require("./routes"));

// handle error
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: err.stack,
    message: err.message || "Internal server error!",
  });
});

module.exports = app;
