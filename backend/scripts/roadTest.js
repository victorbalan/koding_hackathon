var Intersection = require('./road/intersection')
var RoadPortion = require('./road/roadPortion')
var RuleChecker = require('./rule/ruleChecker')
var Engine = require('./car/modules/engine')


module.exports.testCarForMockedCircuit = function(Car, generatedMapData, callback){
	var intersectionsMap = generatedMapData.intersectionsMap
	var roadsMap = generatedMapData.roadsMap
	var roadsLength = generatedMapData.roadsLength

	var response = []
	var car = new Car()
	var engine = new Engine(10, 80, -5)
	car.engine = engine

	var startIntersection = intersectionsMap[generatedMapData.start]
	var finishIntersection = intersectionsMap[generatedMapData.finish]
	car.setPosition(100,100)
	var time = 0
	var tick = 0.1
	var carSpeed = 40 // car starts at 0m/s
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
			if(verifyPosition(carPosX, carPosY, carSpeed, nextIntersection, tick)){
				finishedRoad = true
			}
			if(verifyPosition(carPosX, carPosY, carSpeed, finishIntersection, tick)){
				if(startIntersection == finishIntersection){
					if(currentLap == 10){
						addJsonResponse(response, 'FINISHED', time, finishIntersection.getX(), finishIntersection.getY(), referenceDegree, carSpeed, carAcceleration, currentLap)
						finished = true
						carfuck = true
						break
					}else{
						currentLap +=1
					}
				}else{
					addJsonResponse(response, 'FINISHED', time, finishIntersection.getX(), finishIntersection.getY(), referenceDegree, carSpeed, carAcceleration, currentLap)
					finished = true
					carfuck = true
					break
				}
			}
			var obstacle = obstacleFailCheck(car, carPosX, carPosY, carSpeed, tick, obstacles, response, time, referenceDegree)
			//console.log(obstacle)
			if(obstacle.code == 1){
				addJsonResponse(response, obstacle.reason.type, time, obstacle.reason.getX(), obstacle.reason.getY(), referenceDegree, carSpeed, carAcceleration, currentLap)
				addJsonResponse(response, obstacle.reason.type, time, obstacle.reason.getX(), obstacle.reason.getY(), referenceDegree, carSpeed, carAcceleration, currentLap)
				finished = true
				carfuck = true
				break
			}else if(obstacle.code == 2){
				addJsonResponse(response, obstacle.reason.type, time, carPosX, carPosY, referenceDegree, carSpeed, carAcceleration, currentLap)
			}else{
				addJsonResponse(response, 'NORMAL', time, carPosX, carPosY, referenceDegree, carSpeed, carAcceleration, currentLap)
			}
			counter++
			if(counter > 9000 || isOutOfBounds(carPosX, carPosY, roadsLength)){
				finishedRoad = true
				carfuck = true
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
	addJsonResponse(response, 'FINISHED', time, carPosX, carPosY, referenceDegree, carSpeed, carAcceleration, currentLap)
	response[response.length-1].carSpeed = 0
	response[response.length-1].carAcceleration = 0
	//console.log(response)
	if(callback!=undefined){
		callback({events: response, crash: carfuck, roads: generatedMapData.roads, roadsLength: generatedMapData.roadsLength})
	}
	return response
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

var obstacleFailCheck = function(car, carPosX, carPosY, carSpeed, tick, obstacles, response, time, referenceDegree){
	for(var i=0;i<obstacles.length;i++){
		if(verifyPosition(carPosX, carPosY, carSpeed, obstacles[i], tick)){
			var ruleCheck = RuleChecker.check(obstacles[i].getType(), carSpeed)
			if(ruleCheck.fail == true){
				//console.log(ruleCheck.reason)
				if(ruleCheck.accelerationMultiplier != undefined){
					car.engine.setFlat()
					return {code: 2, reason: obstacles[i]}
				}
				return {code: 1, reason: obstacles[i]}
			}
		}
	}
	return {code: 0, reason: 'Ok'}
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

var isOutOfBounds = function(carPosX, carPosY, roadsLength){
	if(carPosX > roadsLength && carPosY > roadsLength && carPosX < 0 && carPosY < 0){
		return true
	}
	return false
}

var addJsonResponse = function(response, eventType , time, carPosX, carPosY, referenceDegree, carSpeed, carAcceleration, currentLap){
	response.push({
		event: eventType, 
		time: time,
		x: carPosX,
		y: carPosY,
		angle: referenceDegree,
		carSpeed: carSpeed,
		carAcceleration: carAcceleration,
		currentLap: currentLap
	})
}