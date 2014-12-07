module.exports = function(maxAcceleration, maxSpeed, maxBreaking){
	this.maxAcceleration = maxAcceleration
	this.maxSpeed = maxSpeed
	this.heat = 20
	this.heatThreshhold = 200
	this.maxBraking = maxBreaking
	this.wheels = 4

	this.getAcceleration = function(carAcceleration){
		if(carAcceleration > this.maxAcceleration){
			return this.maxAcceleration
		}
		if(carAcceleration < maxBreaking){
			return this.maxBraking
		}
		return carAcceleration
	}

	this.getSpeed = function(carSpeed){
		if(carSpeed > this.maxSpeed){
			return this.maxSpeed
		}
		return carSpeed
	}

	this.getMaxSpeed = function(){
		return this.maxSpeed = this.maxSpeed
	}

	this.getMaxAcceleration = function(){
		return this.maxAcceleration
	}

	this.getMaxBrakeing = function(){
		return this.maxAcceleration
	}

	this.checkEngine = function(){
		if(this.heat > this.heatThreshhold){
			return false
		}
		return true
	}

	this.setFlat = function(){
		if(this.wheels > 0){
			this.maxAcceleration = this.maxAcceleration * 0.9
			this.maxSpeed = this.maxSpeed * 0.9
			this.wheels--
		}
	}
}