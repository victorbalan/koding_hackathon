var Car = require('../scripts/car/car.js')
var RoadTest = require('../scripts/roadTest')
var MapMockingService = require('../scripts/road/mapMockingService')

module.exports.testCar = function(){
	RoadTest.testCarForMockedCircuit(Car, MapMockingService.getMockedBaseMap())
}