var Intersection = require('./intersection')
var RoadPortion = require('./roadPortion')
var EventType = require('./eventType')

module.exports.generate = function(intersectionMatrix, road){
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

	var createRoadPortion = function(fromIntersection, toIntersection, type){
		var roadPortion = new RoadPortion(0, fromIntersection, toIntersection, type)
		return roadPortion
	}

	for(var i =0; i<intersectionMatrix.length; i++){
		if(intersectionMatrix[i]!=undefined){
			if(intersectionObjectMatrix[i]==undefined){
				intersectionObjectMatrix[i] = []
			}
			for(var j=0; j<intersectionMatrix[i].length; j++){
				if(intersectionMatrix[i][j]!=undefined){
					var intersection = createIntersection(i+1, j+1, intersectionMatrix[i][j].semaphore, intersectionMatrix[i][j].events)
					intersectionObjectMatrix[i][j] = intersection
					intersectionList.push(intersection)
					intersectionsMap[(i+1) + "" + (j+1)] = intersection
				}
			}
		}
	}

	for(var i=0; i<road.length; i++){
		var newRoad = createRoadPortion(
			intersectionObjectMatrix[road[i].fromX-1][road[i].fromY-1],
			intersectionObjectMatrix[road[i].toX-1][road[i].toY-1],
			"NORMAL")
		roadPortions[roadPortions.length] = newRoad
		roadsMap[road[i].fromX+""+road[i].fromY+""+road[i].toX+""+road[i].toY] = newRoad
		intersectionObjectMatrix[road[i].fromX-1][road[i].fromY-1]
			.addAdjacentIntersection(intersectionObjectMatrix[road[i].toX-1][road[i].toY-1])
	}
	
	return {'roadsMap': roadsMap, 'intersectionsMap': intersectionsMap, 'intersectionList': intersectionList}
}