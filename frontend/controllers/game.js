var request = require('request');
var Car = require('../models/Car')

exports.game = function(req, res) {	
	Car.findOne({userId: req.session.passport.user}, function(err, car){
	    request.post('http://localhost:8081/car/test', 
	    	{form :
	    		{map: "base",
	    		carModel: car.carModel}},
	    	function(err, response, body){
	    		var jsonBody = JSON.parse(body)
	    		var events = jsonBody.events
	    		var roads = jsonBody.roads
				var maxLength = jsonBody.roadsLength; 	
	    		console.log(events)
				res.render('game', {
					title: 'Game',
					roads: roads,
					matrixMaxLength: maxLength,
					events: events
				});
	    	});
	});
};