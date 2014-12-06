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
	var carSpeed = 25 // car starts at 0m/s
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
		var obstacle = roadsMap[createIdForRoadsMap(lastIntersection, nextIntersection)].getObstacles()[0]

		var finishedRoad = false
		while(!finishedRoad){
			if(verifyPosition(carPosX, carPosY, carSpeed, nextIntersection, tick)){
				finishedRoad = true
			}
			if(verifyPosition(carPosX, carPosY, carSpeed, finishIntersection, tick)){
				finished = true
			}
			if(obstacle != undefined && verifyPosition(carPosX, carPosY, carSpeed, obstacle, tick)){
				var ruleCheck = RuleChecker.check(obstacle.getType(), carSpeed)
				if(ruleCheck.fail == true){
					finished = true
					finishedRoad = true
					console.log(ruleCheck.reason)
					break
				}
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
			//call the users Accelerate function
			car.accelerate()
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