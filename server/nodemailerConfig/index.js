const nodemailer = require('nodemailer');

exports.transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: Buffer.from(process.env.NODEMAILER_USER, 'base64').toString(),
    pass: Buffer.from(process.env.NODEMAILER_PASS, 'base64').toString()
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