"use strict";

const express = require("express");
const apiKey = require("../middlewares/apiKeyMiddleware");
const permission = require("../middlewares/permissionMiddleware");
<<<<<<< HEAD
const { pushToDiscordLog } = require("../middlewares/loggerMiddleware");
=======
>>>>>>> 305dda835173c4d4c16913722c54e3378fe78d55

const router = express.Router();

// test
router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Backend NodeJS Architecture!",
  });
});

<<<<<<< HEAD
// add log to discord
router.use(pushToDiscordLog);

=======
>>>>>>> 305dda835173c4d4c16913722c54e3378fe78d55
// check api key
router.use(apiKey);

// check permissions
router.use(permission("0000"));

router.use("/v1/api/product", require("./product"));
router.use("/v1/api/inventory", require("./inventory"));
router.use("/v1/api/discount", require("./discount"));
router.use("/v1/api/cart", require("./cart"));
router.use("/v1/api/checkout", require("./checkout"));
router.use("/v1/api", require("./auth"));

module.exports = router;
