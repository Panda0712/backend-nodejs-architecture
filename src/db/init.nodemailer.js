"use strict";

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "email-smtp.ap-southeast-1.amazonaws.com",
  port: 465,
  secure: true,
  auth: {
    user: "AKIA45W7WGZBCLIDGPGC",
    pass: "BK9T1LDhe+6nBtD27dpJSAM+gTTL+vJ2imrVs+0qfLYk",
  },
});

module.exports = transport;
