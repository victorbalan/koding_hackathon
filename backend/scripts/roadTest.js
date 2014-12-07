var Intersection = require('./road/intersection')
var RoadPortion = require('./road/roadPortion')
var RuleChecker = require('./rule/ruleChecker')
var Engine = require('./car/modules/engine')


module.exports.testCarForMockedCircuit = function(Car, generatedMapData, callback){
	var intersectionsMap = generatedMapData.intersectionsMap
	var roadsMap = generatedMapData.roadsMap

	var response = []
	var car = new Car()
	var engine = new Engine(40, 70, -5)
	car.engine = engine

	var startIntersection = intersectionsMap[generatedMapData.start]
	var finishIntersection = intersectionsMap[generatedMapData.finish]
	car.setPosition(100,100)
	var time = 0
	var tick = 0.1
	var carSpeed = 0 // car starts at 0m/s
	var carAcceleration = car.getAcceleration() //must be diffrent than 0
	var carPosX = startIntersection.getX()
	var carPosY = startIntersection.getY()
	var nextIntersections
	var nextIntersection = startIntersection
	var lastIntersection 
	var finished = false
	var carfuck = false
	var currentLap = 1
	var counter = 1
	var referenceDegree = 0
	while(!finished){
		lastIntersection = nextIntersection	
		nextIntersections = lastIntersection.getAdjacentIntersections()
		nextIntersection = getNextIntersection(nextIntersections, car)
		var angle = computeAngle(lastIntersection, nextIntersection) - referenceDegree
		referenceDegree += angle
		//console.log(angle)
		var nextPointAngle = 2;
		if(verifyPosition(carPosX, carPosY, carSpeed, finishIntersection, tick)){
				//console.log("Current Lap: " + currentLap)
		}
    	//*** get obstacle
		var obstacles = roadsMap[createIdForRoadsMap(lastIntersection, nextIntersection)].getObstacles()

		var finishedRoad = false
		while(!finishedRoad){
			response.push({
				event: 'NORMAL', 
				time: time,
				x: carPosX,
				y: carPosY,
				angle: referenceDegree,
				carSpeed: carSpeed
			})
			counter++ 
			if(verifyPosition(carPosX, carPosY, carSpeed, nextIntersection, tick)){
				finishedRoad = true
			}
			if(verifyPosition(carPosX, carPosY, carSpeed, finishIntersection, tick)){
				if(startIntersection == finishIntersection){
					if(currentLap == 10){
						finished = true
						response.push({
							event: 'FINISH', 
							time: time,
							x: carPosX,
							y: carPosY,
							angle: referenceDegree,
							carSpeed: carSpeed
						})
					}else{
						currentLap +=1
					}
				}else{
					finished = true
					response.push({
						event: 'FINISH', 
						time: time,
						x: carPosX,
						y: carPosY,
						angle: referenceDegree,
						carSpeed: carSpeed
					})
				}
			}
			if(obstacleFailCheck(carPosX, carPosY, carSpeed, tick, obstacles, response, time, referenceDegree)){
				//if we pass an obstacle set a flag on it as passed or it can be triggered twice
				finished = true
				carfuck = true
				break
			}
			time += tick
			carAcceleration = engine.getAcceleration(car.getAcceleration())
			var directionX = nextIntersection.getX() - carPosX
			var directionY = nextIntersection.getY() - carPosY

			var a = Math.sqrt(directionX*directionX+directionY*directionY)
			directionX = directionX/a
			directionY = directionY/a
			if(carAcceleration != 0){ // if carAcceleration is 0 then the carSpeed dosent change
				carSpeed = engine.getSpeed(carSpeed + carAcceleration * tick)
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
		//logPositionError(nextIntersection, carPosX, carPosY)
		carPosX = nextIntersection.getX()
		carPosY = nextIntersection.getY()
	}
	console.log(response)
	if(callback!=undefined){
		callback({events: response, crash: carfuck})
	}
	return {events: response}
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

var obstacleFailCheck = function(carPosX, carPosY, carSpeed, tick, obstacles, response, time, referenceDegree){
	for(var i=0;i<obstacles.length;i++){
		if(verifyPosition(carPosX, carPosY, carSpeed, obstacles[i], tick)){
			var ruleCheck = RuleChecker.check(obstacles[i].getType(), carSpeed)
			if(ruleCheck.fail == true){
				//console.log(ruleCheck.reason)
				if(ruleCheck.accelerationMultiplier != undefined){
					return false
				}
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

var getNextIntersection = function(nextIntersections, car){
	for(var i=0; i<nextIntersections.length; i++) {
   		if (nextIntersections[i].getId() == car.decideDirection(nextIntersections)){
   			return nextIntersections[i]
   		}
	}
}

var logPositionError = function(nextIntersection, carPosX, carPosY){
	console.log("Position Errors X:" + Math.abs(nextIntersection.getX() - carPosX) + " Y:" + Math.abs(nextIntersection.getY() - carPosY))
}

var computeAngle = function(lastIntersection, nextIntersection){
	dx = nextIntersection.getX() - lastIntersection.getX()
	dy = nextIntersection.getY() - lastIntersection.getY()
	return Math.atan2(dx, dy) * 180 / Math.PI
}