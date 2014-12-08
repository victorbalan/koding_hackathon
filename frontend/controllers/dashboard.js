/**
 * GET /dashboard
 * Dashboard form page.
 */
var request = require('request');
var Car = require('../models/Car');
var Race = require('../models/Race');

exports.getDashboard = function(req, res) {
  Car.find({userId: req.session.passport.user}, function(err, cars){
	Race.find({userid: req.session.passport.user}, function(errRace, races){
			var maxCount=0;
			var mostUsedCarI=0;
			var mostUsedCar="";
			var maxSpeedReached=0;
			var racesWon = 0;
			var carMap = {};
			for(var i=0;i<cars.length; i++){
				if(carMap[cars[i]._id]==undefined){
					carMap[cars[i]._id] = {counter:0 , carId: cars[i]._id}; // map {carId: 0}
				}
			}
			for(var j=0;j<races.length;j++){
				if(carMap[races[j].carid]!=undefined){
					carMap[races[j].carid].counter = carMap[races[j].carid].counter +1
					if(maxSpeedReached < races[j].maxSpeed) {
						maxSpeedReached = races[j].maxSpeed;
					}
					if(races[j].won == true) {
						racesWon++;
					}
				}
			}
			for(var k=0;k<races.length;k++) {
				if(carMap[races[k].carid]!=undefined){
					if(maxCount < carMap[races[k].carid].counter) {
						maxCount = carMap[races[k].carid].counter;
						mostUsedCar = carMap[races[k].carid].carId;
					}
				}
			}
			var neededCarName = undefined
			for(var i=0;i<cars.length;i++){
				if(cars[i]._id === mostUsedCar){
					neededCarName = cars[i].name
				}
			}
			res.render('dashboard', {
				title: 'Dashboard',
				cars: cars,
				race: races,
				mostUsedCar: neededCarName,
				maxSpeedReached: maxSpeedReached,
				racesWon: racesWon
			});
		});
	});
};