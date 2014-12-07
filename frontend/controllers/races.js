var Car = require('../models/Car')

exports.getRaces = function(req, res) {
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
			error: ""
		});
	});
};