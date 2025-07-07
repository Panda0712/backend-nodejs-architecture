"use strict";

const JWT = require("jsonwebtoken");
const { HEADER } = require("./constants");
const { findById } = require("../services/apikey.service");
const { asyncHandler } = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require("./apiError");
const { findByShopId } = require("../services/keyToken.service");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // create access token
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    // create refresh token
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    // try to verify the token
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("Error verify::", err);
      } else {
        console.log("decode verify::", decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

const createTokenPairV2 = async (payload, publicKey, privateKey) => {
  try {
    // create access token
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    // create refresh token
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // try to verify the token
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("Error verify::", err);
      } else {
        console.log("decode verify::", decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden error!",
      });
    }

    // check obj key in the database
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden error!",
      });
    }

    req.objKey = objKey;
    next();
  } catch (error) {
    return error;
  }
};

const permission = (permission) => {
  // return a closure function to use
  // properties of parent function (permission)
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permissions denied!",
      });
    }

    console.log("Permission::", req.objKey.permission);
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permissions denied!",
      });
    }

    next();
  };
};

const authentication = asyncHandler(async (req, res, next) => {
  /*
  1. check user id missing?
  2. get accessToken
  3. verifyToken
  4. check user in db
  5. check keystore with this userid
  6. OK all -> return next  
  */

  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid request!");

  const keyStore = await findByShopId(userId);
  if (!keyStore) throw new NotFoundError("Not found KeyStore!");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request!");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.shopId)
      throw new AuthFailureError("Invalid ShopId!");
    req.keyStore = keyStore;
    next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  createTokenPairV2,
  apiKey,
  permission,
  authentication,
};
