"use strict";

const keyTokenModel = require("../models/keytoken.model");
const keyTokenModelV2 = require("../models/keytokenv2.model");

class KeyTokenService {
  static createKeyToken = async ({ shopId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await keyTokenModel.create({
        shop: shopId,
        publicKey: publicKeyString,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static createKeyTokenV2 = async ({ shopId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModelV2.create({
        shop: shopId,
        publicKey,
        privateKey,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
