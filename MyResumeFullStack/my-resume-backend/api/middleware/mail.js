const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
// const testpath = path.join(__dirname, 'views');
// console.log('TEST PATH::', testpath);
const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  // host: 'smtp.mailgun.org',
  // port: 587,
  // secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  // tls: {
  //   rejectUnauthorized: false
  // }
});

mailTransporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './views',
      layoutsDir: './views',
      defaultLayout: 'index.handlebars',
    },
    viewPath: './views',
    extName: '.handlebars',
  })
);

let mailDetails = {
  from: process.env.EMAIL,
  to: 'vaibhav.katariya@accionlabs.com',
  subject: 'Test mail',
  text: 'Test',
  template: 'index',
  context: {
    name: 'VAIBHAV',
  },
};

// mailTransporter.sendMail(mailDetails, function (err, data) {
//   if (err) {
//     console.log(err);
//     // cb(err, null);
//   } else {
//     console.log(data);
//     // cb(null, data);
//   }
// });

module.exports = function sendMail(sendTo, cb) {
  // check for vailid email address
  if (sendTo) {
    mailDetails.to = sendTo;
    return mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  }
};
