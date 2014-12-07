var request = require('request');
var Car = require('../models/Car')

exports.game = function(req, res) {	
	// var roads = [{fromX: 100, fromY: 100, toX: 100, toY: 150},
	// 	{fromX: 100, fromY: 150, toX: 150, toY: 150},
	// 	{fromX: 150, fromY: 150, toX: 150, toY: 200},
	// 	{fromX: 150, fromY: 200, toX: 100, toY: 250},
	// 	{fromX: 100, fromY: 250, toX: 100, toY: 300}];
	
	// var maxLength = 301; 	


	Car.findOne({userId: req.session.passport.user}, function(err, car){
	    request.post('http://localhost:8081/car/test', 
	    	{form :
	    		{map: "base",
	    		carModel: car.carModel}},
	    	function(err, response, body){
	    		var jsonBody = JSON.parse(body)
	    		var events = jsonBody.events
	    		var roads = jsonBody.roads.road
				var maxLength = jsonBody.roads.maxLength; 	
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