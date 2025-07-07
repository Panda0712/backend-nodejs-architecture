"use strict";

const { CREATED, SuccessResponse } = require("../utils/apiSuccess");

const AuthService = require("../services/auth.service");

class AuthController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AuthService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    await AuthService.logout({ keyStore: req.keyStore });
    new SuccessResponse({
      message: "Logout successfully!",
    }).send(res);
  };

  signUp = async (req, res, next) => {
    const { email, name, password } = req.body;
    const newUser = await AuthService.signUp({ email, name, password });
    new CREATED({
      message: "Registered successfully!",
      metadata: newUser,
    }).send(res);
  };
}

module.exports = new AuthController();
