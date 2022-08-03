const express = require('express');
const config = require('./config');
const client = require('twilio')(config.accountSID, config.authToken);
const app = express();

//MSG91
//353397AXenUqOOy601ac828P1
//vaibhavkatariya_1612370662AL04

const port = 3000;

app.get('/verify', (req, res) => {
	client.verify
		.services(config.serviceID)
		.verificationChecks.create({
			to: `+${req.query.phonenumber}`,
			channel: req.query.channel,
			code: req.query.code,
		})
		.then((response) => {
			res.status(200).send(response);
		});
});

app.get('/login', (req, res) => {
	client.verify
		.services(config.serviceID)
		.verifications.create({
			to: `+${req.query.phonenumber}`,
			channel: req.query.channel,
		})
		.then((response) => {
			res.status(200).send(response);
		});
});

app.listen(port, () => {
	console.log(`Server is running at port ${port}.`);
});
