var MapGenerationService = require('./mapGenerationService')
var Obstacle = require('./obstacle')
var ObstacleType = require('./obstacleType')


module.exports.getMockedBaseMap = function(){
	var intersectionMatrix = []
	intersectionMatrix[100] = []
	intersectionMatrix[100][100] = {semaphore: true, events: ["GROAPA", "CACAT"]}
	intersectionMatrix[100][150] = {semaphore: false, events: []}
	intersectionMatrix[100][250] = {semaphore: false, events: []}
	intersectionMatrix[100][300] = {semaphore: false, events: []}
	intersectionMatrix[150] = []
	intersectionMatrix[150][150] = {semaphore: false, events: []}
	intersectionMatrix[150][200] = {semaphore: false, events: []}

	var o1 = new Obstacle(0, 100, 145, ObstacleType.POTHOLE)
	var o2 = new Obstacle(0, 115, 150, ObstacleType.POTHOLE)
	var o3 = new Obstacle(0, 140, 150, ObstacleType.POTHOLE)

	var road = [{fromX: 100, fromY: 100, toX: 100, toY: 150, obstacles: [o1]},
		{fromX: 100, fromY: 150, toX: 150, toY: 150, obstacles: [o2]},
		{fromX: 150, fromY: 150, toX: 150, toY: 200, obstacles: []},
		{fromX: 150, fromY: 200, toX: 100, toY: 250, obstacles: []},
		{fromX: 100, fromY: 250, toX: 100, toY: 300, obstacles: []}]

	return MapGenerationService.generate(intersectionMatrix, road, 100100, 100300)
}

module.exports.getCircuitMap = function(){
	var intersectionMatrix = []

	intersectionMatrix[0] = []
	intersectionMatrix[0][500] = {semaphore: true, events: []}
	intersectionMatrix[0][1000] = {semaphore: false, events: []}

	intersectionMatrix[500] = []
	intersectionMatrix[500][1500] = {semaphore: false, events: []}

	intersectionMatrix[1000] = []
	intersectionMatrix[1000][1500] = {semaphore: false, events: []}

	intersectionMatrix[1500] = []
	intersectionMatrix[1500][1000] = {semaphore: false, events: []}
	intersectionMatrix[1500][500] = {semaphore: false, events: []}

	intersectionMatrix[1000][0] = {semaphore: false, events: []}
	intersectionMatrix[500][0] = {semaphore: false, events: []}

	var road = [{fromX: 0, fromY: 500, toX: 0, toY: 1000, obstacles: []},
				{fromX: 0, fromY: 1000, toX: 500, toY: 1500, obstacles: []},
				{fromX: 500, fromY: 1500, toX: 1000, toY: 1500, obstacles: []},
				{fromX: 1000, fromY: 1500, toX: 1500, toY: 1000, obstacles: []},
				{fromX: 1500, fromY: 1000, toX: 1500, toY: 500, obstacles: []},
				{fromX: 1500, fromY: 500, toX: 1000, toY: 0, obstacles: []},
				{fromX: 1000, fromY: 0, toX: 500, toY: 0, obstacles: []},
				{fromX: 500, fromY: 0, toX: 0, toY: 500, obstacles: []}]

	return MapGenerationService.generate(intersectionMatrix, road, '0500', '0500')
}

module.exports.getSprintMap = function(){

}