var request = require('request');
var Car = require('../models/Car')
var Race = require('../models/Race');

exports.game = function(req, res) {	
	if(req.body.carId!=undefined && req.body.raceId!=undefined){
		Car.findOne({_id: req.body.carId}, function(err, car){
		    request.post('http://localhost:8081/car/test', 
		    	{form :
		    		{raceId: req.body.raceId,
		    		carModel: car.carModel}},
		    	function(err, response, body){
			        if (!err && response.statusCode == 200) {
			    		var jsonBody = JSON.parse(body)
			    		var events = jsonBody.events
			    		var roads = jsonBody.roads
						var maxLength = jsonBody.roadsLength; 	
			    		//console.log(events)
						res.render('game', {
							title: 'Game',
							roads: roads,
							matrixMaxLength: maxLength,
							events: events
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


// var race = new Race({
// 		userid: req.session.passport.user,
// 		carid: req.body.carid,
// 		raceType: req.body.raceType,
// 		maxSpeed: Math.floor((Math.random() * 100) + 1)
// });
// race.save(function(err){

// if(err){
// 	console.log(err)
// 	res.redirect('/error')
// }else{	
// }