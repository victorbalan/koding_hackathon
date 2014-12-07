module.exports = function(maxAcceleration, maxSpeed, maxBreaking){
	this.maxAcceleration = maxAcceleration
	this.maxSpeed = maxSpeed
	this.heat = 20
	this.heatThreshhold = 200
	this.maxBraking = maxBreaking

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

	this.checkEngine = function(){
		if(this.heat > this.heatThreshhold){
			return false
		}
		return true
	}
}