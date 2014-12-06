var MapGenerationService = require('./mapGenerationService')
var Obstacle = require('./obstacle')
var ObstacleType = require('./obstacleType')


module.exports.getMockedBaseMap = function(){
	var intersectionMatrix = []
	intersectionMatrix[99] = []
	intersectionMatrix[99][99] = {semaphore: true, events: ["GROAPA", "CACAT"]}
	intersectionMatrix[99][149] = {semaphore: false, events: []}
	intersectionMatrix[149] = []
	intersectionMatrix[149][149] = {semaphore: false, events: []}

	var o1 = new Obstacle(0, 100, 145, ObstacleType.SPEEDLIMIT50)
	var o2 = new Obstacle(0, 115, 150, ObstacleType.SPEEDLIMIT90)
	var o3 = new Obstacle(0, 140, 150, ObstacleType.POTHOLE)

	var road = [{fromX: 100, fromY: 100, toX: 100, toY: 150, obstacles: [o1]},
		{fromX: 100, fromY: 150, toX: 150, toY: 150, obstacles: [o2, o3]}]

	return MapGenerationService.generate(intersectionMatrix, road, 100100, 150150)
}