var request = require('request');
var Car = require('../models/Car')
var fs = require('fs')

/**
 * GET /fileUpload
 * FileUpload form page.
 */
 exports.getGarage = function(req, res) {
	Car.find({userId: req.session.passport.user}, function(err, cars){
		res.render('garage', {
			title: 'Garage',
			cars: cars,
			error: ""
		});
	});
};

exports.postNewCar = function(req, res, next) {
	// req.assert(req.files.file, 'No file selected').notEmpty();
	var fileValid = true
	if(req.files.file==undefined || req.files.file.originalFilename.split('.').pop()!=="js"){
		fileValid = false
	}
	if(fileValid){
		fs.readFile(req.files.file.path, 'utf8', function (err,data) {
			if (err) {
				console.log(err);
			}else{
			  	request.post('http://localhost:8081/car/info', 
					{form: {data: data} },
					function(error, response, body) {
				        if (!error && response.statusCode == 200) {
				        	console.log(body)
				        	var jsonCar = JSON.parse(body).car
				            var car = new Car({
								userId: req.session.passport.user,
								carModel: jsonCar.carModel,
								name: req.body.carName,
								maxSpeed: jsonCar.maxSpeed,
								maxAcceleration: jsonCar.maxAcceleration,
								breaking: jsonCar.maxBrakeing,
								handling: 30,
								grip: 70,
								isFav: false,
								maxSpeedReached: 101
							})
							car.save(function(err){
								if(err){
									console.log(err)
									res.redirect('/error')
								}else{	
									res.redirect('/garage');
								}
							});
				        }else{
							Car.find({userId: req.session.passport.user}, function(err, cars){
								res.render('garage', {
									title: 'Garage',
									cars: cars,
									error: "Your uploaded file is corrupt. Please try again with another file."
								});
							});
				        }
			   		});
			}
		});
	}else{
		Car.find({userId: req.session.passport.user}, function(err, cars){
			res.render('garage', {
				title: 'Garage',
				cars: cars,
				error: "File format must be javascript."
			});
		});	}
};

exports.deleteCar = function(req, res){
	console.log(req.params.carId)
	Car.remove({_id: req.params.carId}, function(err){
		if(err){
			res.redirect('/error')
		}else{
			res.redirect('/garage')
		}
	})
}