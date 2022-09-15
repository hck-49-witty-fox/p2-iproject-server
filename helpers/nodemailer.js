const nodemailer = require("nodemailer");
const { Model } = require("sequelize");

const theMailer = (email) => {
  let mailTransport = nodemailer.createTransport({
    host: "mail.helloriyan.my.id",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "nodemail@helloriyan.my.id",
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  let detail = {
    from: "dont-reply@helloriyan.my.id",
    to: email,
    subject: "Welcome",
    text: "Hai, welcome to this application",
  };

  mailTransport.sendMail(detail, (err) => {
    if (err) {
      console.log(`Something went wrong!`, err);
    } else {
      console.log("success");
    }
  });
};

module.exports = theMailer;
