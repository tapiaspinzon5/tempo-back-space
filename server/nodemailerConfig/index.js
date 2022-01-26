const nodemailer = require('nodemailer');

exports.transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "37137ac60f24f8",
    pass: "38358ad902d842"
  }
});

