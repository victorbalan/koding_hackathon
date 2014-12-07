var Car = require('../scripts/car/car.js')
var RoadTest = require('../scripts/roadTest')
var MapMockingService = require('../scripts/road/mapMockingService')

module.exports.testCar = function(){
	RoadTest.testCarForMockedCircuit(Car, MapMockingService.getMockedBaseMap())
}

module.exports.testUserCar = function(UserCar, callback){
	RoadTest.testCarForMockedCircuit(UserCar, MapMockingService.getMockedBaseMap(), callback)
}

module.exports.getCarJsonFromConfigFile = function(UserCar, carModel, callback){
	var car = new UserCar()
	var engine = car.getEngine()

	var carJson = {
		maxAcceleration: engine.getMaxAcceleration(),
		maxSpeed: engine.getMaxSpeed(),
		maxBrakeing: engine.getMaxBrakeing(),
		grip: 40,
		handling: 15,
		carModel: carModel
	}

	callback({'car': carJson})
}