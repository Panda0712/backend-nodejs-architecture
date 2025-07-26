"use strict";

const { newUser } = require("../services/user.service");
const { SuccessResponse } = require("../utils/apiSuccess");

class UserController {
  // new user
  newUserController = async (req, res, next) => {
    const response = await newUser({
      email: req.body.email,
    });

    new SuccessResponse(response).send(res);
  };

  // check user token via email
  checkRegisterEmailToken = async (req, res, next) => {};
}

module.exports = new UserController();
