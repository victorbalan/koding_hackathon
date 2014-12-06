module.exports = function(id, fromIntersection, toIntersection, type){
	this.id = id
	this.fromIntersection = fromIntersection
	this.toIntersection = toIntersection
	this.type = type
	this.distance = 100
	
	this.getType = function(){
		return this.type
	}

	this.print = function(){
		console.log("from: " + fromIntersection.toStringC() + "; to: " + toIntersection.toStringC() + "; type: " + type)
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
}