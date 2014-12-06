var Car = require('../model/Car')

exports.createCar = function(req, res, next){
	var car = new Car({
		userId: req.body.userId,
		carModel: req.body.carModel
	})
	car.save(function(err){
		if(err){
 			res.redirect('/error');
		}else{
 			res.redirect('/garrage');		
		}
	})
}