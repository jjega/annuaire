const express = require('express');
const app = express();
const path = require('path');
let cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

const marvel = require('./routes/marvel/marvel');

app.use('/', marvel);

// catch 404 and forward to error handler
app.use('/*', function(req, res, next){
	return res.status(404).json({ status: false, error: "Not Found", });
});
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});
app.set('views', path.join(__dirname, 'views'));

module.exports = app;