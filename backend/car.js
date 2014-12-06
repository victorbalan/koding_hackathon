var Engine = require('./engine')

module.exports = function(callback){
	this.acceleration = 0
	this.speed = 0
	this.engine = new Engine(5, 140)
	this.x
	this.y
	this.events 

	this.accelerate = function(acceleration){

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
}