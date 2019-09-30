const config = require('./data/config.json');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const keys = require('./data/keys');
const nodemailer = require('nodemailer');

/*********** Configurations ***********/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 3001;

sgMail.setApiKey(keys.sendGridKey);

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: keys.nodeMailerUser,
    pass: keys.nodeMailerPass
  }
});

/*********** My Routes ***********/

app.get('/config', (req, res) => {
  res.send(config);
});

app.post('/mail', (req, res) => {
  //Create the mail template with content
  var mailOptions = {
    from: req.body.email,
    to: 'simon.mpoyus@gmail.com',
    subject: `Note from ${req.body.fullName} on your portfolio`,
    html: `<h1>Note left from your website</h1><p>${req.body.message}</p>`
  };

  // Send email with  NodeMailer
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  // Send email with SendGrid
  sgMail.send(mailOptions);

  res.send('Thank you for your message!');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

/*********** Start Listening ***********/

app.listen(port, () => console.log(`Listening on port ${port}`));
