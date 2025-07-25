"use strict";

const { newTemplate } = require("../services/template.service");
const { SuccessResponse } = require("../utils/apiSuccess");

class EmailController {
  newTemplate = async (req, res, next) => {
    new SuccessResponse({
      message: "new template",
      metadata: await newTemplate(req.body),
    }).send(res);
  };
}

module.exports = new EmailController();
