var MapGenerationService = require('./mapGenerationService')

module.exports.getMockedBaseMap = function(){
	var intersectionMatrix = []
	intersectionMatrix[99] = []
	intersectionMatrix[99][99] = {semaphore: true, events: ["GROAPA", "CACAT"]}
	intersectionMatrix[99][149] = {semaphore: false, events: []}
	intersectionMatrix[149] = []
	intersectionMatrix[149][149] = {semaphore: false, events: []}


	var road = [{fromX: 100, fromY: 100, toX: 100, toY: 150},
		{fromX: 100, fromY: 150, toX: 150, toY: 150}]

	return MapGenerationService.generate(intersectionMatrix, road)
}