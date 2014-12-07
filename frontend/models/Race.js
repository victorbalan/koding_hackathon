//userid, carid, raceType, maxSpeed
var mongoose = require('mongoose');

var raceSchema = new mongoose.Schema({
	userid: {type: String, required: true},
	carid: {type: String, required: true},
	raceType: {type: String, required: true},
	maxSpeed: {type: Number, required: true},
	won: {type: Boolean, required: true}
});

module.exports = mongoose.model('Race', raceSchema);