"use strict";

const express = require("express");
const { apiKey } = require("../middlewares/apiKeyMiddleware");
const { permission } = require("../middlewares/permissionMiddleware");

const router = express.Router();

// check api key
router.use(apiKey);

// check permissions
router.use(permission("0000"));

router.use("/v1/api", require("./auth"));
router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Backend NodeJS Architecture!",
  });
});

module.exports = router;
