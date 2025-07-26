"use strict";

const { AuthFailureError } = require("../utils/apiError");
const { sendEmailToken } = require("./email.service");
const User = require("../models/user.model");

const newUser = async ({ email = null, captcha = null }) => {
  // 1. check email existence in db
  const user = await User.findOne({ email }).lean();

  // 2. if user is exists
  if (user) return AuthFailureError("User is already exists!");

  // 3. send token via user email
  const result = await sendEmailToken({ email });

  // 4. return the result
  return {
    message: "Created user successfully!",
    statusCode: 201,
    metadata: { token: result },
  };
};

module.exports = {
  newUser,
};
