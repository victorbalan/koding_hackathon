var Engine = require('./scripts/car/modules/engine')

module.exports = function(callback){
	this.acceleration = 0
	this.speed = 0
	this.engine = new Engine(100,14,46)
	this.x = 0
	this.y = 0
	this.events 
	this.elapsedTime = 0
	this.nextIntersection

	this.accelerate = function(infoToNextObstacle){
		if(infoToNextObstacle!=undefined){
			// console.log(infoToNextObstacle.distance)
		}
		this.acceleration = 100
		if(this.y > 260){
			this.acceleration = 100
		}
		//console.log("speed: " + this.speed + " Car pos X:" + this.x + " Y: " + this.y + " At Time:" +this.elapsedTime)
	}

	this.decideDirection = function(intersections){
		if(intersections.length <= 1){
			if(intersections[0]!=undefined){
				//console.log(intersections[0].getId())
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

	this.setPosition = function(x, y){
		this.x = x
		this.y = y
	}

	this.getAcceleration = function(){
		return this.acceleration;
	}

	this.setSpeed = function(speed){
		this.speed = speed
	}

	this.setElapsedTime = function(time){
		this.elapsedTime = time
	}

	this.setEngine = function(engine){
		this.engine = engine
	}
	
	this.getEngine = function(){
		return this.engine
	}
}