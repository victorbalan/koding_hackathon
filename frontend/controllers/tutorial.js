var Stream = require('stream')

exports.getTutorial = function(req, res) {
	res.render('tutorial', {
	title: 'Tutorial'
	});
};
exports.getModelCar = function(req, res) {
	res.download('./car.js')
};
