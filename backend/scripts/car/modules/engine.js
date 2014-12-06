module.exports = function(maxAcceleration, maxSpeed){
	this.maxAcceleration = maxAcceleration
	this.maxSpeed = maxSpeed
	
	this.getMaxAcceleration = function(){
		return this.maxAcceleration
	}

	this.getMaxSpeed = function(){
		return this.maxSpeed
	}
}