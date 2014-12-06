module.exports = function(id, x, y, semaphore){
		this.id = id

		this.x = x
		this.y = y

		this.semaphore = semaphore

		this.adjacentIntersections = []
		
		this.getId = function(){
			return this.id
		}

		this.getClassType = function(){
			return "INTERSECTION"
		}

		this.addAdjacentIntersection = function(intersectionId){
			this.adjacentIntersections.push(intersectionId)
		}

		this.getAdjacentIntersections = function(){
			return this.adjacentIntersections
		}

		this.getX = function(){
			return this.x
		}

		this.getY = function(){
			return this.y
		}

		this.print = function(){
			console.log("id: " + id + " x: " + x + "; y: " + y + "; semaphore: " + semaphore)
		}

		this.toStringC = function(){
			return "x: " + x + "; y: " + y;
		}
}