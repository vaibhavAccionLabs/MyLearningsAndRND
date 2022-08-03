console.log('TEST PARCEL JS');

const express = require('express');
const port = 1234;
const app = express();

app.listen(port, () => {
	console.log('We are live on ' + port);
});
