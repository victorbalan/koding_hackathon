var Intersection = require('./road/intersection')
var RoadPortion = require('./road/roadPortion')
var Car = require('./car/car')
var EventType = require('./road/eventType')

module.exports = function(){
	var intersectionsMap = {}
	var roadsMap = {}
	var intersectionId = 1
	var roadId = 1
	var roadSizeTick = 1 
	var tickDistance = 1

	var wholeRoad = []

	var start = new Intersection(intersectionId, 100,100, false)
	intersectionsMap[intersectionId] = start
	wholeRoad.push(start)
	intersectionId++

	var p1 = new Intersection(intersectionId, 100,150, false)
	start.addAdjacentIntersection(p1.getId())
	intersectionsMap[intersectionId] = p1
	intersectionId++

	var road1 = new RoadPortion(roadId, start, p1, "GROOOPI")
	roadsMap[roadId] = road1
	wholeRoad.push(road1)
	wholeRoad.push(p1)
	roadId++

	var finish = new Intersection(intersectionId, 150,150, false)
	intersectionsMap[intersectionId] = finish
	intersectionId++

	var road2 = new RoadPortion(roadId, p1, finish, "BORCANE")
	roadsMap[roadId] = road2
	wholeRoad.push(road2)
	wholeRoad.push(finish)
	roadId++

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
	for(var i =0; i< wholeRoad.length; i++){
		var nextIntersection
		if(wholeRoad[i].getClassType() == "INTERSECTION"){	
			carPosX = wholeRoad[i].getX()
			carPosY = wholeRoad[i].getY()
			car.setPosition(wholeRoad[i].getX(), wholeRoad[i].getY())
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
					console.log(carAcceleration)
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
	console.log(EventType.POTHOLE)
}

var verifyPosition = function(carPosX, carPosY, carSpeed, nextIntersection, tick){
	if(carPosX >= nextIntersection.getX()-carSpeed*tick && carPosX <= nextIntersection.getX()+carSpeed*tick && carPosY >= nextIntersection.getY()-carSpeed*tick && carPosY <= nextIntersection.getY()+carSpeed*tick){
		return true
	}
	return false
}