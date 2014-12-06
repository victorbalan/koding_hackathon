var Car = require('../scripts/car/car.js')
var RoadTest = require('../scripts/roadTest')

module.exports.testCar = function(){
	RoadTest.testCarForMockedCircuit(Car)
}