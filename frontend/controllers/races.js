var Car = require('../models/Car')

exports.getRaces = function(req, res) {
	var roads = {'roads': [{fromX: 10, fromY: 10, toX: 10, toY: 15},
		  {fromX: 10, fromY: 15, toX: 15, toY: 15},
		  {fromX: 15, fromY: 15, toX: 15, toY: 20},
		  {fromX: 15, fromY: 20, toX: 10, toY: 25},
		  {fromX: 10, fromY: 25, toX: 10, toY: 30}]}
  	var testroads = "{'test': 1}"
	var fmap = {}
	fmap.roads = roads
	var maxLength = 32 	
	Car.find({userId: req.session.passport.user}, function(err, cars){
		res.render('races', {
			title: 'Races',
			cars: cars,
			races: [{name: "Circuit"}, {name: "Sprint"}, {name: "Basic test"}],
			fuckingMap: testroads,
			matrixMaxLength: maxLength
		});
	});
};