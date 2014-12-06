module.exports = function(id, x, y, type){
	this.id = id
	this.x = x
	this.y = y
	this.type = type
	
	this.getId = function(){
		return this.id
	}

	this.getX = function(){
		return this.x
	}

	this.getY = function(){
		return this.y
	}

	this.getType = function(){
		return this.type
	}

}