
Quintus.Test = function(Q) {

  Q.test = function(msg) {
    console.log(msg)
  }

    Q.transformMatrixToMap = function(roads, length){
    	console.log("TRANFORM MAP")
		var TOP_PART = 20
		var BOTTOM_PART = 19
		var LEFT_PART = 24
		var RIGHT_PART = 23

		var OUTER_BOTTOM_LEFT = 4
		var INNER_BOTTOM_LEFT = 2

		var OUTER_BOTTOM_RIGHT = 8
		var INNER_BOTTOM_RIGHT = 6

		var OUTER_TOP_LEFT = 16
		var INNER_TOP_LEFT = 14

		var OUTER_TOP_RIGHT = 12
		var INNER_TOP_RIGHT = 10


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

		var checkCollisionAndPutMinusOne = function(i, j){
			if(matrix[i][j]!=0){
				matrix[i][j] = -1

				return true
			}
			return false
		}

		var checkCollisionAndUpdateFarCorner = function(i, j){
			if(matrix[i+1]!=undefined){
				if(zeroOrUndefinedCheck(matrix[i+1][j]) && zeroOrUndefinedCheck(matrix[i][j-1])){
					matrix[i][j] = OUTER_BOTTOM_LEFT
				}
				if(zeroOrUndefinedCheck(matrix[i+1][j]) && zeroOrUndefinedCheck(matrix[i][j+1])){
					console.log(i + " " + j + " and " + matrix[i+1][j] + " " + matrix[i][j+1])
					matrix[i][j] = OUTER_BOTTOM_RIGHT
				}
			}
			if(matrix[i-1]!=undefined){
				if(zeroOrUndefinedCheck(matrix[i-1][j]) && zeroOrUndefinedCheck(matrix[i][j-1])){
					console.log(i + " " + j + " and " + matrix[i+1][j] + " " + matrix[i][j+1] + " asd")
					matrix[i][j] = OUTER_TOP_LEFT
				}
				if(zeroOrUndefinedCheck(matrix[i-1][j]) && zeroOrUndefinedCheck(matrix[i][j+1])){
					matrix[i][j] = OUTER_TOP_RIGHT
				}
			}
		}

		for(var i = 0; i<roads.length;i++){
			var currentRoad = roads[i]
			if(currentRoad.fromX == currentRoad.toX){
				// VERTICAL
				// console.log("X is " + currentRoad.toX)
				var currentX = 2*currentRoad.fromX
				var from = currentRoad.fromY
				var to = currentRoad.toY
				if(from>to){
					var aux = from
					from = to
					to = aux
				}
				// console.log(from + " from and to " + to + " for HORIZONTAL")
				for(var j=from; j<=to;j++){
					if(!checkCollisionAndPutMinusOne(2*j, currentX)){
						matrix[2*j][currentX] = LEFT_PART
					}
					if(!checkCollisionAndPutMinusOne(2*j, currentX + 1)){
						matrix[2*j][currentX+1] = RIGHT_PART
					}
					if(!checkCollisionAndPutMinusOne(2*j + 1, currentX)){
						matrix[2*j+1][currentX] = LEFT_PART
					}
					if(!checkCollisionAndPutMinusOne(2*j + 1, currentX + 1)){
						matrix[2*j+1][currentX+1] = RIGHT_PART
					}
				}
			}else if(currentRoad.fromY == currentRoad.toY){
				// VERTICAL
				// console.log("Y is " + currentRoad.toY)
				var currentY = 2*currentRoad.fromY
				var from = currentRoad.fromX
				var to = currentRoad.toX
				if(from>to){
					var aux = from
					from = to
					to = aux
				}
				// console.log(from + " from and to " + to + " for VERTICAL")
				for(var j=from; j<=to;j++){
					if(!checkCollisionAndPutMinusOne(currentY, 2*j)){
						matrix[currentY][2*j] = TOP_PART
					}
					if(!checkCollisionAndPutMinusOne(currentY + 1, 2*j)){
						matrix[currentY+1][2*j] = BOTTOM_PART
					}
					if(!checkCollisionAndPutMinusOne(currentY, 2*j + 1)){
						matrix[currentY][2*j+1] = TOP_PART
					}
					if(!checkCollisionAndPutMinusOne(currentY + 1, 2*j + 1)){
						matrix[currentY+1][2*j+1] = BOTTOM_PART
					}
				}
			}
		}

		for(var i=0; i<matrix.length;i++){
			for(var j=0; j<matrix.length;j++){
				if(matrix[i][j]==-1){
					checkCollisionAndUpdateFarCorner(i, j)
				}
			}
		}

		for(var i=0; i<matrix.length;i++){
			for(var j=0; j<matrix.length;j++){
				if(matrix[i][j]==OUTER_BOTTOM_LEFT){
			    matrix[i-1][j] = 3
			    matrix[i-1][j+1] = INNER_BOTTOM_LEFT
			    matrix[i][j+1] = 1
			   }else if(matrix[i][j]==OUTER_BOTTOM_RIGHT){
			    matrix[i-1][j] = 5
			    matrix[i-1][j-1] = INNER_BOTTOM_RIGHT
			    matrix[i][j-1] = 7
			   }else if(matrix[i][j]==OUTER_TOP_RIGHT){
			    matrix[i+1][j] = 11
			    matrix[i+1][j-1] = INNER_TOP_RIGHT
			    matrix[i][j-1] = 9
			   }else if(matrix[i][j]==OUTER_TOP_LEFT){
			    matrix[i+1][j] = 13
			    matrix[i+1][j+1] = INNER_TOP_LEFT
			    matrix[i][j+1] = 15
			   }
			}
		}


		var response
	  for(var i = 0 ; i<matrix.length; i++){
	   for(var j=0; j<matrix.length;j++){
	    response += matrix[i][j]
	   }
	   response += '\n'
	  }
	  // console.log(response)
    	return matrix

    }

	Q.TileLayer.extend("MyTileLayer", {
	    load: function(dataAsset) {
        	var data = Q._isString(dataAsset) ?  Q.asset(dataAsset) : dataAsset;
			this.p.tiles = data;
	    }
	})
};