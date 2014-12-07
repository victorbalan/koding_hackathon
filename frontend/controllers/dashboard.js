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
			res.render('dashboard', {
				title: 'Dashboard',
				cars: cars,
				race: race
			});
		});
	});
};