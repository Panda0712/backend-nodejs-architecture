"use strict";

const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../utils/apiSuccess");

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Created new product successfully!",
      metadata: await ProductService.createProduct(
        req.body.product_type,
        req.body
      ),
    }).send(res);
  };
}

module.exports = new ProductController();
