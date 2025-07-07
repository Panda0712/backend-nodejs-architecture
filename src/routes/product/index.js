"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const productController = require("../../controllers/product.controller");
const authentication = require("../../middlewares/authMiddleware");

const router = express.Router();

// middleware
router.use(authentication);

// create product
router.post("/", asyncHandler(productController.createProduct));

module.exports = router;
