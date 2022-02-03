const nodemailer = require('nodemailer');

exports.transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "37137ac60f24f8",
    pass: "38358ad902d842"
  }
});


// solo para produccion.
// exports.transporter = nodemailer.createTransport({
//   host: "relay.teleperformance.co",
//   port: 25,
//   secure: false,
//   tls:{
//     rejectUnauthorized: false
//   }
// });

// no funciona no se porque -_-
// transport.verify().then(() => {
//   console.log("Ready for send emails");
// });