"use strict";

const crypto = require("crypto");
const OTP = require("../models/otp.model");

const generateTokenRandom = () => {
  const token = crypto.randomInt(0, Math.pow(2, 32));
  return token;
};

const newOtp = async ({ email = null }) => {
  const token = generateTokenRandom();
  const newToken = await OTP.create({
    otp_token: token,
    otp_email: email,
  });

  return newToken;
};

module.exports = {
  generateTokenRandom,
  newOtp,
};
