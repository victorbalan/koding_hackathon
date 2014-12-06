var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	userId: {type: String , required: true},
	carModel: {type: String}
});