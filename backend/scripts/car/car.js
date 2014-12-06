var Engine = require('./modules/engine')

module.exports = function(callback){
	this.acceleration = 0
	this.speed = 0
	this.engine = new Engine(5, 140)
	this.x = 0
	this.y = 0
	this.events 
	this.elapsedTime = 0

	this.accelerate = function(){
		this.acceleration = 1
		if(this.x > 115){
			this.acceleration = 10
		}
		console.log("speed: " + this.speed + " Car pos X:" + this.x + " Y: " + this.y + " At Time:" +this.elapsedTime)
	}

	this.parseRoad = function(){
		if(this.road.getClassType() == "INTERSECTION"){
			this.road.print()
		}else if(this.road.getClassType() == "ROADPORTION"){
			this.accelerate(this.engine.getMaxAcceleration())

			this.road.print()
		}
	}
	this.setPosition = function(x, y){
		this.x = x
		this.y = y
	}

	this.getX = function(){
		return this.x
	}

	this.getY = function(){
		return this.y
	}

	this.setX = function(x){
		this.x = x
	}

	this.setY = function(){
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
}