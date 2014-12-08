/*
This is the car.js file the "brain" of your car, the file you
will have to upload on the site
You should not modify or erase the lines/functions that have above them the comment DONT CHANGE
The functions that are marked by CAN CHANGE you can modify, you will find more details inside them 
*/
//DONT CHANGE
var Engine = require('./scripts/car/modules/engine') 

module.exports = function(callback){
	/*You will have access during the simulation to the following parameters.
	The parameter that allows you to change the cars behaviour is acceleration,
	the simulator will take the acceleration and provide you with the rest of the parameters*/
	this.acceleration = 0
	this.speed = 0
	this.engine = new Engine(100,14,46)
	this.x = 0
	this.y = 0
	this.events 
	this.elapsedTime = 0
	this.nextIntersection
	
	/*You should create your movement/acceleration logic here and in the end
	you should assign the computed value to this.acceleration.
	In infoToNextObstacle you will receive appropriate information regarding 
	the next Obstacles in your way
	For example you will a receive a JSON that will contain the following data:
		{ 
		  distance: 4,
		  obstacle:
		    { 
			 id: 0,
			 x: 100,
			 y: 220,
			 type: 'SPEEDTRAP90',
			 getId: [Function],
			 getX: [Function],
			 getY: [Function],
			 getType: [Function] 
			} 
		}
		
		Possible obstacles : "POTHOLE", "SPEEDTRAP50", "SPEEDTRAP90", "SPEEDTRAP120", "SEMAPHORE_GREEN" and "SEMAPHORE_RED".
	*/
	this.accelerate = function(infoToNextObstacle){
		if(infoToNextObstacle!=undefined){
			// here comes code
		}
		this.acceleration = 10 // this command sets a default acceleration of 10, each time the server is looking for it
	}
	
	/*This function will be called if you are in an intersection and you will be provided 
	with the - NOT USED AT THE MOMENT*/
	this.decideDirection = function(intersections){
		if(intersections.length <= 1){
			if(intersections[0]!=undefined){
				return intersections[0].getId()
			}
			return 0
		}
		else{
			if(intersections[0]!=undefined){
				return intersections[0].getId()
			}
			return 0
		}
	}
	/*DONT CHANGE*/
	this.setPosition = function(x, y){
		this.x = x
		this.y = y
	}
	/*DONT CHANGE*/
	this.getAcceleration = function(){
		return this.acceleration;
	}
	/*DONT CHANGE*/
	this.setSpeed = function(speed){
		this.speed = speed
	}
	/*DONT CHANGE*/
	this.setElapsedTime = function(time){
		this.elapsedTime = time
	}
	/*DONT CHANGE*/
	this.setEngine = function(engine){
		this.engine = engine
	}
	/*DONT CHANGE*/
	this.getEngine = function(){
		return this.engine
	}
}