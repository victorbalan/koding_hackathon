var request = require('request');
var Car = require('../models/Car')
var fs = require('fs')

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

exports.postNewCar = function(req, res, next) {
	// req.assert('fileToUpload', 'No file selected').notEmpty();
	fs.readFile(req.files.file.path, 'utf8', function (err,data) {
	  if (err) {
	    console.log(err);
	  }else{
	  	saveCar(req.session.passport.user, data, req.body.carName)
	  	request.post('http://localhost:8081/car/check', 
		{form: {data: data} },
		function(error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body)
	        }
   		});
	  }
	});
	
 	res.redirect('/garage');
};
var saveCar = function(userId, carModel, carName){
		var car = new Car({
			userId: userId,
			carModel: carModel,
			name: carName
		})
		car.save(function(err){
			if(err){
			}else{	
			}
		})
}