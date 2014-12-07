var Engine = require('./modules/engine')

module.exports = function(callback){
	this.acceleration = 0
	this.speed = 0
	this.engine 
	this.x = 0
	this.y = 0
	this.events 
	this.elapsedTime = 0
	this.nextIntersection

	this.accelerate = function(infoToNextObstacle){
		if(infoToNextObstacle!=undefined){
		}
		this.acceleration = 100
		if(this.y > 260){
			this.acceleration = -100
		}
	}

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
}