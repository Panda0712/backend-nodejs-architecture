"use strict";

const express = require("express");
const checkoutController = require("../../controllers/checkout.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authenticationV2 } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/review", asyncHandler(checkoutController.checkoutReview));

module.exports = router;
