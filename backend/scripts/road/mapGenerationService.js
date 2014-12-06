var Intersection = require('./intersection')
var RoadPortion = require('./roadPortion')
var Obstacle = require('./obstacle')

module.exports.generate = function(intersectionMatrix, road, start, finish){
	var intersectionId = 1

	intersectionObjectMatrix = []
	intersectionList = []
	roadMap = {}
	roadPortions = []

	var intersectionsMap = {}
	var roadsMap = {}
	var roadId = 1

	var createIntersection = function(x, y, semaphore, events){
		var intersection = new Intersection(intersectionId, x, y, semaphore)
		intersectionId++
		return intersection
	}

	var createRoadPortion = function(fromIntersection, toIntersection, obstacles){
		var roadPortion = new RoadPortion(0, fromIntersection, toIntersection, obstacles)
		return roadPortion
	}

	for(var i =0; i<intersectionMatrix.length; i++){
		if(intersectionMatrix[i]!=undefined){
			if(intersectionObjectMatrix[i]==undefined){
				intersectionObjectMatrix[i] = []
			}
			for(var j=0; j<intersectionMatrix[i].length; j++){
				if(intersectionMatrix[i][j]!=undefined){
					var intersection = createIntersection(i, j, intersectionMatrix[i][j].semaphore, intersectionMatrix[i][j].events)
					intersectionObjectMatrix[i][j] = intersection
					intersectionList.push(intersection)
					intersectionsMap[(i) + "" + (j)] = intersection
				}
			}
		}
	}
	for(var i=0; i<road.length; i++){
		var newRoad = createRoadPortion(
			intersectionObjectMatrix[road[i].fromX][road[i].fromY],
			intersectionObjectMatrix[road[i].toX][road[i].toY],
			road[i].obstacles)
		roadPortions[roadPortions.length] = newRoad
		roadsMap[road[i].fromX+""+road[i].fromY+""+road[i].toX+""+road[i].toY] = newRoad
		intersectionObjectMatrix[road[i].fromX][road[i].fromY]
			.addAdjacentIntersection(intersectionObjectMatrix[road[i].toX][road[i].toY])
	}
	
	return {'roadsMap': roadsMap, 'intersectionsMap': intersectionsMap,
	 'intersectionList': intersectionList, 'start': start, 'finish': finish}
}