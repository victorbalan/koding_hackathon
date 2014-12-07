/**
 * GET /dashboard
 * Dashboard form page.
 */
var request = require('request');
var Car = require('../models/Car');
var Race = require('../models/Race');

exports.getDashboard = function(req, res) {
  Car.find({userId: req.session.passport.user}, function(err, cars){
	Race.find({userId: req.session.passport.user}, function(errRace, race){
			var i;
			var maxCount=0;
			var mostUsedCar="";
			for(i=0;i<cars.length;i++) {
				//console.log(cars[i].name);
				Race.count({userid: req.session.passport.user, carid: cars[i].name}, function(err, c){
					if(err) {
						console.log('Error getting car count!');
					}
					else {
						if(maxCount < c) {
							maxCount = c;
							//mostUsedCar = cars[i].name;
						}
					}
					console.log(c);
				});
			}
			res.render('dashboard', {
				title: 'Dashboard',
				cars: cars,
				race: race,
				mostUsedcar: mostUsedCar
			});
		});
	});
};