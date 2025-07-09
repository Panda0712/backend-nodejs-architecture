"use strict";

const { ObjectId } = require("mongodb");
const inventoryModel = require("../inventory.model");

const insertInventory = async ({
  productId,
  shopId,
  stock,
  location = "unknown",
}) => {
  return await inventoryModel.create({
    inventory_productId: new ObjectId(String(productId)),
    inventory_stock: stock,
    inventory_location: location,
    inventory_shopId: new ObjectId(String(shopId)),
  });
};

module.exports = {
  insertInventory,
};
