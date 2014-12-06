var request = require('request');
var Car = require('../models/Car')

/**
 * GET /fileUpload
 * FileUpload form page.
 */
 exports.getGarage = function(req, res) {
	Car.find({userId: req.session.passport.user}, function(err, cars){
		console.log(cars)
		res.render('garage', {
		title: 'Garage',
		cars: cars
		});
	});
};
