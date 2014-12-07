var Car = require('../models/Car')

exports.getRaces = function(req, res) {
	Car.find({userId: req.session.passport.user}, function(err, cars){
		res.render('races', {
			title: 'Races',
			cars: cars,
			races: [{name: "Circuit"}, {name: "Sprint"}, {name: "Basic test"}]
		});
	});
};