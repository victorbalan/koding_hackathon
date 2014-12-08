var request = require('request');
var Car = require('../models/Car')
var Race = require('../models/Race');

exports.game = function(req, res) {	
	if(req.body.carId!=undefined && req.body.raceId!=undefined){
		Car.find(function(err, cars){
			var car = undefined
			var car2 = undefined
			var getRandomInt = function(min, max) {
			  	return Math.floor(Math.random() * (max - min)) + min;
			}
			var ourCarIndex = 0
			for(var i=0;i<cars.length;i++){
				if(cars[i]._id == req.body.carId){
					car = cars[i]
					ourCarIndex = i
				}else{
					car2 = cars[i]
				}
			}
			var finished = false
			var opponentCarIndex = opponentCarIndex = getRandomInt(0, cars.length)
			while(!finished){
				if(opponentCarIndex != ourCarIndex){
					finished = true
				}else{
				opponentCarIndex = getRandomInt(0, cars.length)
				}
			}
			car2 = cars[opponentCarIndex]
			console.log("ourCarIndex: " + ourCarIndex + " randomOpponentIndex: " + opponentCarIndex)
			if(car2!=undefined){
			    request.post('http://localhost:8081/cars/test', 
			    	{form :
			    		{raceId: req.body.raceId,
			    		carModel1: car.carModel,
			    		carModel2: car2.carModel}},
			    	function(err, response, body){
				        if (!err && response.statusCode == 200) {
				    		var jsonBody = JSON.parse(body)
				    		var car1data = jsonBody.car1
				    		var car2data = jsonBody.car2
				    		var eventsp1 = car1data.events
				    		var eventsp2 = car2data.events
				    		var roads = car1data.roads
							var maxLength = car1data.roadsLength; 
							res.render('multiplayer', {
								title: 'Multiplayer',
								roads: roads,
								matrixMaxLength: maxLength,
								eventsp1: eventsp1,
								eventsp2: eventsp2
							});
						}else{
							Car.find({userId: req.session.passport.user}, function(err, cars){
								res.render('races', {
									title: 'Races',
									cars: cars,
									races: [
										{_id:'CIRCUIT', name: "Circuit"}, 
										{_id: 'SPRINT', name: "Sprint"},
										{_id: 'LVL1', name: "Level 1"},
										{_id: 'LVL2', name: "Level 2"},
										{_id: 'LVL3', name: "Level 3"},
										{_id: 'LVL4', name: "Level 4"},
										{_id: 'LVL5', name: "Level 5"},
									],
									error: "The witches defeated us. Somthing bad happened on the server."
								});
							});
						}
		  		});
			}else{
				Car.find({userId: req.session.passport.user}, function(err, cars){
					res.render('races', {
						title: 'Races',
						cars: cars,
						races: [
							{_id:'CIRCUIT', name: "Circuit"}, 
							{_id: 'SPRINT', name: "Sprint"},
							{_id: 'LVL1', name: "Level 1"},
							{_id: 'LVL2', name: "Level 2"},
							{_id: 'LVL3', name: "Level 3"},
							{_id: 'LVL4', name: "Level 4"},
							{_id: 'LVL5', name: "Level 5"},
						],
						error: "Not enough opponents on this server."
					});
				});
			}
		});
	}else{		
		Car.find({userId: req.session.passport.user}, function(err, cars){
			res.render('races', {
				title: 'Races',
				cars: cars,
				races: [
					{_id:'CIRCUIT', name: "Circuit"}, 
					{_id: 'SPRINT', name: "Sprint"},
					{_id: 'LVL1', name: "Level 1"},
					{_id: 'LVL2', name: "Level 2"},
					{_id: 'LVL3', name: "Level 3"},
					{_id: 'LVL4', name: "Level 4"},
					{_id: 'LVL5', name: "Level 5"},
				],
				error: "You must select a car and a race to start."
			});
		});
	}
}