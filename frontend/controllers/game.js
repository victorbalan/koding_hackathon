var request = require('request');
var Car = require('../models/Car')
var Race = require('../models/Race');

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
	    		//console.log(events)
				res.render('game', {
					title: 'Game',
					roads: roads,
					matrixMaxLength: maxLength,
					events: events
				});
  		});
	});
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