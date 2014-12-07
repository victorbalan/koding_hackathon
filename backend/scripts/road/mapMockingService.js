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

	return MapGenerationService.generate(intersectionMatrix, road, 100100, 100300, 301)
}

module.exports.getCircuitMap = function(){
	var intersectionMatrix = []
	intersectionMatrix[100] = []
	intersectionMatrix[100][100] = {semaphore: true, events: ["GROAPA", "CACAT"]}
	intersectionMatrix[100][300] = {semaphore: false, events: []}
	intersectionMatrix[200] = []
	intersectionMatrix[200][100] = {semaphore: false, events: []}
	intersectionMatrix[200][200] = {semaphore: false, events: []}
	intersectionMatrix[300] = []
	intersectionMatrix[300][200] = {semaphore: false, events: []}
	intersectionMatrix[300][300] = {semaphore: false, events: []}

	var o1 = new Obstacle(0, 150, 100, ObstacleType.POTHOLE)
	var o2 = new Obstacle(0, 250, 200, ObstacleType.POTHOLE)
	var o3 = new Obstacle(0, 140, 150, ObstacleType.POTHOLE)

	var road = [{fromX: 100, fromY: 100, toX: 200, toY: 100, obstacles: [o1]},
		  {fromX: 200, fromY: 100, toX: 200, toY: 200, obstacles: [o2]},
		  {fromX: 200, fromY: 200, toX: 300, toY: 200, obstacles: []},
		  {fromX: 300, fromY: 200, toX: 300, toY: 300, obstacles: []},
		  {fromX: 300, fromY: 300, toX: 100, toY: 300, obstacles: []},
		  {fromX: 100, fromY: 300, toX: 100, toY: 100, obstacles: []}]


	return MapGenerationService.generate(intersectionMatrix, road, '100100', '100100', 301)
}

module.exports.getSprintMap = function(){

}

module.exports.getLevelMap = function(level){
	switch(level){
		case 1:
			var intersectionMatrix = []
			intersectionMatrix[100] = []
			intersectionMatrix[100][100] = {semaphore: true, events: []}
			intersectionMatrix[100][500] = {semaphore: false, events: []}

			var road = [{fromX: 100, fromY: 100, toX: 100, toY: 500, obstacles: []}]

			return MapGenerationService.generate(intersectionMatrix, road, 100100, 100500, 501)
			break;
		case 2:
			var intersectionMatrix = []
			intersectionMatrix[100] = []
			intersectionMatrix[100][100] = {semaphore: true, events: []}
			intersectionMatrix[100][150] = {semaphore: false, events: []}
			intersectionMatrix[100][200] = {semaphore: false, events: []}
			intersectionMatrix[150] = []
			intersectionMatrix[150][150] = {semaphore: false, events: []}
			intersectionMatrix[150][200] = {semaphore: false, events: []}

			var road = [{fromX: 100, fromY: 100, toX: 100, toY: 150, obstacles: []},
				{fromX: 100, fromY: 150, toX: 150, toY: 150, obstacles: []},
				{fromX: 150, fromY: 150, toX: 150, toY: 200, obstacles: []},
				{fromX: 150, fromY: 200, toX: 100, toY: 200, obstacles: []}]

			return MapGenerationService.generate(intersectionMatrix, road, 100100, 100200, 201)
			break;
		case 3:
			var intersectionMatrix = []
			intersectionMatrix[100] = []
			intersectionMatrix[100][100] = {semaphore: true, events: []}
			intersectionMatrix[100][150] = {semaphore: false, events: []}
			intersectionMatrix[100][200] = {semaphore: false, events: []}
			intersectionMatrix[100][250] = {semaphore: false, events: []}
			intersectionMatrix[150] = []
			intersectionMatrix[150][150] = {semaphore: false, events: []}
			intersectionMatrix[150][200] = {semaphore: false, events: []}

			var o1 = new Obstacle(0, 100, 135, ObstacleType.POTHOLE)
			var o2 = new Obstacle(0, 120, 150, ObstacleType.SPEEDLIMIT50)
			var o3 = new Obstacle(0, 100, 220, ObstacleType.SPEEDLIMIT90)

			var road = [{fromX: 100, fromY: 100, toX: 100, toY: 150, obstacles: [o1]},
				{fromX: 100, fromY: 150, toX: 150, toY: 150, obstacles: [o2]},
				{fromX: 150, fromY: 150, toX: 150, toY: 200, obstacles: []},
				{fromX: 150, fromY: 200, toX: 100, toY: 200, obstacles: []},
				{fromX: 100, fromY: 200, toX: 100, toY: 250, obstacles: [o3]}]

			return MapGenerationService.generate(intersectionMatrix, road, 100100, 100250, 251)
			break;
		case 4:
			var intersectionMatrix = []
			intersectionMatrix[100] = []
			intersectionMatrix[100][100] = {semaphore: true, events: []}
			intersectionMatrix[100][300] = {semaphore: false, events: []}
			intersectionMatrix[100][200] = {semaphore: false, events: []}
			intersectionMatrix[200] = []
			intersectionMatrix[200][100] = {semaphore: false, events: []}
			intersectionMatrix[200][200] = {semaphore: false, events: []}
			intersectionMatrix[300] = []
			intersectionMatrix[300][200] = {semaphore: false, events: []}
			intersectionMatrix[300][300] = {semaphore: false, events: []}

			var o1 = new Obstacle(0, 100, 145, ObstacleType.POTHOLE)
			var o2 = new Obstacle(0, 200, 150, ObstacleType.NOSPEEDLIMIT)
			var o3 = new Obstacle(0, 300, 265, ObstacleType.SPEEDLIMIT50)

			var road = [{fromX: 100, fromY: 100, toX: 200, toY: 100, obstacles: [o2]},
				  {fromX: 200, fromY: 100, toX: 200, toY: 200, obstacles: [o2]},
				  {fromX: 200, fromY: 200, toX: 300, toY: 200, obstacles: []},
				  {fromX: 300, fromY: 200, toX: 300, toY: 300, obstacles: [o3]},
				  {fromX: 300, fromY: 300, toX: 100, toY: 300, obstacles: []},
				  {fromX: 100, fromY: 300, toX: 100, toY: 200, obstacles: []}]


			return MapGenerationService.generate(intersectionMatrix, road, 100100, 100200, 301)
			break;
		case 5:
			var intersectionMatrix = []
			intersectionMatrix[100] = []
			intersectionMatrix[100][100] = {semaphore: true, events: ["GROAPA", "CACAT"]}
			intersectionMatrix[100][300] = {semaphore: false, events: []}
			intersectionMatrix[200] = []
			intersectionMatrix[200][100] = {semaphore: false, events: []}
			intersectionMatrix[200][200] = {semaphore: false, events: []}
			intersectionMatrix[300] = []
			intersectionMatrix[300][200] = {semaphore: false, events: []}
			intersectionMatrix[300][300] = {semaphore: false, events: []}

			var o1 = new Obstacle(0, 100, 145, ObstacleType.POTHOLE)
			var o2 = new Obstacle(0, 115, 150, ObstacleType.POTHOLE)
			var o3 = new Obstacle(0, 140, 150, ObstacleType.POTHOLE)

			var road = [{fromX: 100, fromY: 100, toX: 200, toY: 100, obstacles: [o2]},
				  {fromX: 200, fromY: 100, toX: 200, toY: 200, obstacles: []},
				  {fromX: 200, fromY: 200, toX: 300, toY: 200, obstacles: []},
				  {fromX: 300, fromY: 200, toX: 300, toY: 300, obstacles: []},
				  {fromX: 300, fromY: 300, toX: 100, toY: 300, obstacles: []},
				  {fromX: 100, fromY: 300, toX: 100, toY: 100, obstacles: []}]


			return MapGenerationService.generate(intersectionMatrix, road, '100100', '100100', 301)
			break;
	}
}