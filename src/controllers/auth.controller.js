"use strict";

const { CREATED } = require("../utils/apiSuccess");

const AuthService = require("../services/auth.service");

class AuthController {
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
