var Intersection = require('./road/intersection')
var RoadPortion = require('./road/roadPortion')
var EventType = require('./road/eventType')

module.exports.testCarForMockedCircuit = function(Car, generatedMapData){
	var intersectionsMap = generatedMapData.intersectionsMap
	var roadsMap = generatedMapData.roadsMap

	var car = new Car()

	var startIntersection = intersectionsMap[generatedMapData.start]
	var finishIntersection = intersectionsMap[generatedMapData.finish]
	car.setPosition(100,100)
	var time = 0
	var tick = 0.1
	var carSpeed = 10 // car starts at 0m/s
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
		//console.log(car.decideDirection(nextIntersections))
		for(var i=0; i<nextIntersections.length; i++) {
			//console.log(nextIntersections[i].getId()+ "   "+ car.decideDirection(nextIntersections))
       		if (nextIntersections[i].getId() == car.decideDirection(nextIntersections)){
       			nextIntersection = nextIntersections[i]
       		}
    	}
		//console.log(nextIntersection)
		var finishedRoad = false

		while(!finishedRoad){
			if(verifyPosition(carPosX, carPosY, carSpeed, nextIntersection, tick)){
				finishedRoad = true
			}
			if(verifyPosition(carPosX, carPosY, carSpeed, finishIntersection, tick)){
				finished = true
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

var verifyPosition = function(carPosX, carPosY, carSpeed, nextIntersection, tick){
	//console.log(nextIntersection)
	if(carPosX >= nextIntersection.getX()-carSpeed*tick && carPosX <= nextIntersection.getX()+carSpeed*tick && carPosY >= nextIntersection.getY()-carSpeed*tick && carPosY <= nextIntersection.getY()+carSpeed*tick){
		return true
	}
	return false
}