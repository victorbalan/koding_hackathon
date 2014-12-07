
Quintus.Test = function(Q) {

  Q.test = function(msg) {
    console.log(msg)
  }

    Q.transformMatrixToMap = function(roads, length){
		var matrixLength = 2*length
		var getEmptyMatrix = function(n){
			var m = []
			for(var i=0;i<n;i++){
				m[i] = []
				for(var j=0;j<n;j++){
					m[i][j] = 0
				}
			}
			return m
		}
		var matrix = getEmptyMatrix(matrixLength)
		var zeroOrUndefinedCheck = function(item){
			if(item == 0 || item == undefined){
				return true
			}
			return false
		}

		var checkCollisionAndUpdateFarCorner = function(i, j){
			if(matrix[i][j]!=0){
				matrix[i][j] = 0
				return true
			}
			return false
		}

		for(var i = 0; i<roads.length;i++){
			var currentRoad = roads[i]
			if(currentRoad.fromX == currentRoad.toX){
				// VERTICAL
				console.log("X is " + currentRoad.toX)
				var currentX = 2*currentRoad.fromX
				var from = currentRoad.fromY
				var to = currentRoad.toY
				if(from>to){
					var aux = from
					from = to
					to = aux
				}
				console.log(from + " from and to " + to + " for HORIZONTAL")
				for(var j=from; j<=to;j++){
					if(!checkCollisionAndUpdateFarCorner(2*j, currentX)){
						matrix[2*j][currentX] = 24
					}
					if(!checkCollisionAndUpdateFarCorner(2*j, currentX + 1)){
						matrix[2*j][currentX+1] = 23
					}
					if(!checkCollisionAndUpdateFarCorner(2*j + 1, currentX)){
						matrix[2*j+1][currentX] = 24
					}
					if(!checkCollisionAndUpdateFarCorner(2*j + 1, currentX + 1)){
						matrix[2*j+1][currentX+1] = 23
					}
				}
			}else if(currentRoad.fromY == currentRoad.toY){
				// VERTICAL
				console.log("Y is " + currentRoad.toY)
				var currentY = 2*currentRoad.fromY
				var from = currentRoad.fromX
				var to = currentRoad.toX
				if(from>to){
					var aux = from
					from = to
					to = aux
				}
				console.log(from + " from and to " + to + " for VERTICAL")
				for(var j=from; j<=to;j++){
					if(!checkCollisionAndUpdateFarCorner(currentY, j)){
						matrix[currentY][2*j] = 20
					}
					if(!checkCollisionAndUpdateFarCorner(currentY + 1, j)){
						matrix[currentY+1][2*j] = 19
					}
					if(!checkCollisionAndUpdateFarCorner(currentY, j + 1)){
						matrix[currentY][2*j+1] = 20
					}
					if(!checkCollisionAndUpdateFarCorner(currentY + 1, j + 1)){
						matrix[currentY+1][2*j+1] = 19
					}
				}
			}
		}
		for(var i=0;i<matrix.length;i++){
			var line = "";
			for(var j=0;j<matrix.length;j++){
				if(matrix[i][j]!=0){
					line = line + "[" + i + "," + j + ":" + matrix[i][j] + "] ";
				}
			}
			if(line!=""){
				console.log(line)
				console.log("")
			}	
		}
    	return matrix

    }

	Q.TileLayer.extend("MyTileLayer", {
	    load: function(dataAsset) {
        	var data = Q._isString(dataAsset) ?  Q.asset(dataAsset) : dataAsset;
			this.p.tiles = data;
	    }
	})
};