var Car = require('../scripts/car/car.js')
var RoadTest = require('../scripts/roadTest')
var MapMockingService = require('../scripts/road/mapMockingService')

module.exports.testCar = function(){
	RoadTest.testCarForMockedCircuit(Car, MapMockingService.getCircuitMap())
}

module.exports.testUserCar = function(UserCar, callback){
	RoadTest.testCarForMockedCircuit(UserCar, MapMockingService.getMockedBaseMap(), callback)
}