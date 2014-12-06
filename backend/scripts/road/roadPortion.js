module.exports = function(id, fromIntersection, toIntersection, obstacles){
	this.id = id
	this.fromIntersection = fromIntersection
	this.toIntersection = toIntersection
	this.distance = 100
	this.obstacles = obstacles

	this.print = function(){
		console.log("from: " + fromIntersection.toStringC() + "; to: " + toIntersection.toStringC())
	}

	this.getClassType = function(){
		return "ROADPORTION"
	}

	this.getDistance = function(){
		return this.distance
	}

	this.getFromIntersection = function(){
		return this.fromIntersection
	}

	this.getToIntersection = function(){
		return this.toIntersection
	}

	this.getObstacles = function(){
		return this.obstacles
	}
}