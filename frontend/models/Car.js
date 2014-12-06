var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	userId: {type: String , required: true},
	carModel: {type: String , required: true},
	name: {type: String , required: true}
});

module.exports = mongoose.model('Car', carSchema);