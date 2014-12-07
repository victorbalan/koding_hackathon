var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	userId: {type: String , required: true},
	carModel: {type: String , required: true},
	name: {type: String , required: true},
	maxSpeed: {type: Number, required: true},
	maxAcceleration: {type: Number, required: true},
	breaking: {type: Number, required: true},
	handling: {type: Number, required: true},
	grip: {type: Number, required: true}
});

module.exports = mongoose.model('Car', carSchema);