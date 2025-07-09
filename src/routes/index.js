"use strict";

const express = require("express");
const apiKey = require("../middlewares/apiKeyMiddleware");
const permission = require("../middlewares/permissionMiddleware");

const router = express.Router();

// test
router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Backend NodeJS Architecture!",
  });
});

// check api key
router.use(apiKey);

// check permissions
router.use(permission("0000"));

router.use("/v1/api/product", require("./product"));
router.use("/v1/api", require("./auth"));

module.exports = router;
