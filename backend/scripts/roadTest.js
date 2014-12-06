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
	var carSpeed = 0 // car starts at 0m/s
	var carAcceleration = car.accelerate()
	for(var i =0; i< wholeRoad.length; i++){
		var nextIntersection
		if(wholeRoad[i].getClassType() == "INTERSECTION"){	
			car.setPosition(wholeRoad[i].getX(), wholeRoad[i].getY())
			//console.log("intersection: "+car.x + " " + car.y)
		}else if(wholeRoad[i].getClassType() == "ROADPORTION"){
			nextIntersection = wholeRoad[i+1]
			wholeRoad[i+1].print()
			var finished = false
			console.log(car.getX() + " " + car.getY())
			while(!finished){
				if(car.getX() >= nextIntersection.getX()-carSpeed*tick && car.getX() <= nextIntersection.getX()+carSpeed*tick && car.getY() >= nextIntersection.getY()-carSpeed*tick && car.getY() <= nextIntersection.getY()+carSpeed*tick){
					finished = true
				}
				time += tick
				var directionX = (nextIntersection.getX() - car.getX())
				var directionY = (nextIntersection.getY() - car.getY())
				//console.log(car.x + " " + car.y)
				var a = Math.abs(Math.sqrt(directionX*directionX+directionY*directionY))
				directionX = directionX/a
				directionY = directionY/a
				carSpeed += carAcceleration*tick
				if(car.getX() > 115){
					carAcceleration = -1.5
				}
				//SET USER STUFF
				car.setSpeed = carSpeed; 
				car.setPosition(car.getX()+directionX*(carSpeed*tick), car.getY()+directionY*(carSpeed*tick))
				//console.log(directionX*(carSpeed/tick) + " " + directionY*(carSpeed/tick))
				console.log("car at: x="+car.x + " y=" + car.y + " at time:" + time + " with Speed: " + carSpeed)
			}
		}
	}
	console.log(EventType.POTHOLE)
}