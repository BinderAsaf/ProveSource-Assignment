const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

// db connection
mongoose.connect('mongodb://localhost:27017/codeTest', {
	autoReconnect: true,
	reconnectTries: 60,
	reconnectInterval: 10000,
	useNewUrlParser: true,
	useCreateIndex: true
});


//bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//routes uses
app.use('/account/create', require('./api/account/create'));
app.use('/notifications', require('./api/notifications/Notifications'));

app.listen(3000);
console.log('app running on port 3000...');

module.exports = app;
