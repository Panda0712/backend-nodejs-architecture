"use strict";

const express = require("express");
const authController = require("../../controllers/auth.controller");
const { asyncHandler } = require("../../utils/asyncHandler");

const router = express.Router();

router.post("/shop/signup", asyncHandler(authController.signUp));
router.post("/shop/login", asyncHandler(authController.login));

module.exports = router;
