var Intersection = require('./road/intersection')
var RoadPortion = require('./road/roadPortion')
var RuleChecker = require('./rule/ruleChecker')


module.exports.testCarForMockedCircuit = function(Car, generatedMapData){
	var intersectionsMap = generatedMapData.intersectionsMap
	var roadsMap = generatedMapData.roadsMap

	var car = new Car()

	var startIntersection = intersectionsMap[generatedMapData.start]
	var finishIntersection = intersectionsMap[generatedMapData.finish]
	car.setPosition(100,100)
	var time = 0
	var tick = 0.1
	var carSpeed = 35 // car starts at 0m/s
	var carAcceleration = car.getAcceleration() //must be diffrent than 0
	var carPosX = startIntersection.getX()
	var carPosY = startIntersection.getY()
	var nextIntersections
	var nextIntersection = startIntersection
	var lastIntersection 
	var finished = false
	while(!finished){
		lastIntersection = nextIntersection	
		nextIntersections = lastIntersection.getAdjacentIntersections()
		for(var i=0; i<nextIntersections.length; i++) {
       		if (nextIntersections[i].getId() == car.decideDirection(nextIntersections)){
       			nextIntersection = nextIntersections[i]
       		}
    	}
    	//*** get obstacle
		var obstacles = roadsMap[createIdForRoadsMap(lastIntersection, nextIntersection)].getObstacles()

		var finishedRoad = false
		while(!finishedRoad){
			if(verifyPosition(carPosX, carPosY, carSpeed, nextIntersection, tick)){
				finishedRoad = true
			}
			if(verifyPosition(carPosX, carPosY, carSpeed, finishIntersection, tick)){
				finished = true
			}
			if(obstacleFailCheck(carPosX, carPosY, carSpeed, tick, obstacles)){
				finished = true
				break
			}
			time += tick

			carAcceleration = car.getAcceleration()
			var directionX = nextIntersection.getX() - carPosX
			var directionY = nextIntersection.getY() - carPosY

			var a = Math.sqrt(directionX*directionX+directionY*directionY)
			directionX = directionX/a
			directionY = directionY/a
			if(carAcceleration != 0){ // if carAcceleration is 0 then the carSpeed dosent change
				carSpeed += carAcceleration*tick
			}
			carPosX = carPosX + directionX*(carSpeed*tick) 
			carPosY = carPosY + directionY*(carSpeed*tick)
			//SET USER STUFF 
			car.setPosition(carPosX, carPosY)
			car.setElapsedTime(time)
			car.setSpeed(carSpeed)

			//call the users Accelerate function********************************
			var infoToNextObstacle = distanceToNextObstacle(carPosX, carPosY, obstacles)
			if(infoToNextObstacle.obstacle == undefined){
				infoToNextObstacle = undefined
			}
			car.accelerate(infoToNextObstacle)
		}
		carPosX = nextIntersection.getX()
		carPosY = nextIntersection.getY()
	}
}

var verifyPosition = function(carPosX, carPosY, carSpeed, position, tick){
	if(carPosX >= position.getX()-carSpeed*tick && carPosX <= position.getX()+carSpeed*tick && carPosY >= position.getY()-carSpeed*tick && carPosY <= position.getY()+carSpeed*tick){
		return true
	}
	return false
}

var createIdForRoadsMap = function(prevIntersection, nextIntersection){
	return prevIntersection.getX() + "" + prevIntersection.getY() + "" + nextIntersection.getX() + "" + nextIntersection.getY()
}

var obstacleFailCheck = function(carPosX, carPosY, carSpeed, tick, obstacles){
	for(var i=0;i<obstacles.length;i++){
		if(verifyPosition(carPosX, carPosY, carSpeed, obstacles[i], tick)){
			var ruleCheck = RuleChecker.check(obstacles[i].getType(), carSpeed)
			if(ruleCheck.fail == true){
				console.log(ruleCheck.reason)
				return true
			}
		}
	}
	return false
}

var distanceToObstacle = function(carPosX, carPosY, obstacle){
	var xDist = carPosX - obstacle.getX()
	var yDist = carPosY - obstacle.getY()
	return Math.sqrt(xDist * xDist + yDist * yDist)
}

var distanceToNextObstacle = function(carPosX, carPosY, obstacles){
	var data = {distance: 99999999, obstacle: undefined}
	for(var i=0;i<obstacles.length;i++){
		var dto = distanceToObstacle(carPosX, carPosY, obstacles[i])
		if(dto<data.distance){
			data.distance = dto
			data.obstacle = obstacles[i]
		}
	}
	return data
}