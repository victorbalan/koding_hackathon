var Intersection = require('./road/intersection')
var RoadPortion = require('./road/roadPortion')
var Car = require('./car/car')
var EventType = require('./road/eventType')
var MapGenerationService = require('./road/mapGenerationService')

module.exports = function(){
	var intersectionMatrix = []
	intersectionMatrix[99] = []
	intersectionMatrix[99][99] = {semaphore: true, events: ["GROAPA", "CACAT"]}
	intersectionMatrix[99][149] = {semaphore: false, events: []}
	intersectionMatrix[149] = []
	intersectionMatrix[149][149] = {semaphore: false, events: []}


	var road = [{fromX: 100, fromY: 100, toX: 100, toY: 150},
		{fromX: 100, fromY: 150, toX: 150, toY: 150}]

	var generatedMapData = MapGenerationService.generate(intersectionMatrix, road)

	var intersectionsMap = generatedMapData.intersectionsMap
	var roadsMap = generatedMapData.roadsMap

	var wholeRoad = []

	wholeRoad.push(intersectionsMap[100100])
	wholeRoad.push(roadsMap[100100100150])
	wholeRoad.push(intersectionsMap[100150])
	wholeRoad.push(roadsMap[100150150150])
	wholeRoad.push(intersectionsMap[150150])

	var car = new Car(function(eventType){
		console.log(eventType)
	})

	car.setPosition(100,100)
	var time = 0
	var tick = 0.1
	var carSpeed = 10 // car starts at 0m/s
	var carAcceleration = car.getAcceleration() //must be diffrent than 0
	var carPosX
	var carPosY
	var nextIntersections
	for(var i =0; i< wholeRoad.length; i++){
		var nextIntersection
		if(wholeRoad[i].getClassType() == "INTERSECTION"){	
			carPosX = wholeRoad[i].getX()
			carPosY = wholeRoad[i].getY()
			car.setPosition(wholeRoad[i].getX(), wholeRoad[i].getY())
			nextIntersections = wholeRoad[i].getAdjacentIntersections()
			console.log(car.decideDirection(nextIntersections))
			//console.log("intersection: "+car.getX() + " " + car.getY())
		}else if(wholeRoad[i].getClassType() == "ROADPORTION"){
			nextIntersection = wholeRoad[i+1]
			wholeRoad[i+1].print()
			var finished = false
			//console.log(car.getX() + " " + car.getY())
			while(!finished){
				if(verifyPosition(carPosX, carPosY, carSpeed, nextIntersection, tick)){
					finished = true
				}
				time += tick
				//get the users acceleration
				carAcceleration = car.getAcceleration()
				var directionX = nextIntersection.getX() - carPosX
				var directionY = nextIntersection.getY() - carPosY
				//console.log(directionX + " " + directionY)
				var a = Math.sqrt(directionX*directionX+directionY*directionY)
				directionX = directionX/a
				directionY = directionY/a
				if(carAcceleration != 0){ // if carAcceleration is 0 then the carSpeed dosent change
					carSpeed += carAcceleration*tick
					//console.log(carAcceleration)
				}
				carPosX = carPosX + directionX*(carSpeed*tick) 
				carPosY = carPosY + directionY*(carSpeed*tick)
				//SET USER STUFF 
				car.setPosition(carPosX, carPosY)
				car.setElapsedTime(time)
				car.setSpeed(carSpeed)
				//console.log(car.getX() + " " + car.getY())
				//console.log(directionX*(carSpeed/tick) + " " + directionY*(carSpeed/tick))
				//console.log("car at: x="+car.getX() + " y=" + car.getY() + " at time:" + time + " with Speed: " + carSpeed)
				//call the users Accelerate function
				car.accelerate()
			}
		}
	}
	//console.log(EventType.POTHOLE)
}

var verifyPosition = function(carPosX, carPosY, carSpeed, nextIntersection, tick){
	if(carPosX >= nextIntersection.getX()-carSpeed*tick && carPosX <= nextIntersection.getX()+carSpeed*tick && carPosY >= nextIntersection.getY()-carSpeed*tick && carPosY <= nextIntersection.getY()+carSpeed*tick){
		return true
	}
	return false
}