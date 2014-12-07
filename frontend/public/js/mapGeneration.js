
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
		var checkCollision = function(i, j){
			if(matrix[i][j]!=0){
				matrix[i][j]=-1
				if(zeroOrUndefinedCheck(matrix[i-1][j])){
					if(zeroOrUndefinedCheck(matrix[i][j+1])){
						matrix[i][j] = 12
					}
				}
				
				if(zeroOrUndefinedCheck(matrix[i-1][j])){
					if(zeroOrUndefinedCheck(matrix[i][j-1])){
						matrix[i][j] = 16
					}
				}

				if(zeroOrUndefinedCheck(matrix[i+1][j])){
					if(zeroOrUndefinedCheck(matrix[i][j+1])){
						matrix[i][j] = 8
					}
				}

				if(zeroOrUndefinedCheck(matrix[i+1][j])){
					if(zeroOrUndefinedCheck(matrix[i][j-1])){
						matrix[i][j] = 4
					}
				}
				return true
			}
			return false
		}

		// - check matrix inner curves. Look @ picture
		// 4 means bottom left
		// 8 means bottom right
		// 12 means top right
		// 16 means top left
		// - if we get this values we will 
		// set the adjacent positions to the needed sprite nr
		var checkInnerCurves = function(i, j){
			if(matrix[i][j]==4){
				matrix[i-1][j] = 3
				matrix[i-1][j+1] = 2
				matrix[i][j+1] = 1
			}else if(matrix[i][j]==8){
				matrix[i-1][j] = 5
				matrix[i-1][j-1] = 6
				matrix[i][j-1] = 7
			}else if(matrix[i][j]==12){
				matrix[i+1][j] = 11
				matrix[i+1][j-1] = 10
				matrix[i][j-1] = 9
			}else if(matrix[i][j]==16){
				matrix[i+1][j] = 13
				matrix[i+1][j+1] = 14
				matrix[i][j+1] = 15
			}
		}

		for(var i=0;i<roads.length;i++){
			if(roads[i].fromX == roads[i].toX){
				//case 1 = straight horizontal line
				var fromY = roads[i].fromY
				var toY = roads[i].toY
				var x = 2*roads[i].fromX
				if(fromY> toY){
					var aux = fromY
					fromY = toY
					toY = aux
				}
				for(var j=fromY; j<=toY;j++){
					// parse all the roads for collisions to set the curve corners
					if(!checkCollision(x,2*j)){
						matrix[x][2*j] = 20
					}
					if(!checkCollision(x+1,2*j)){
						matrix[x+1][2*j] = 19
					}
					if(!checkCollision(x,2*j+1)){
						matrix[x][2*j+1] = 20
					}
					if(!checkCollision(x+1,2*j+1)){
						matrix[x+1][2*j+1] = 19
					}
				}
			}else if(roads[i].fromY == roads[i].toY){
				//case 2 = straight vertical line
				var fromX = roads[i].fromX
				var toX = roads[i].toX
				var y = 2*roads[i].fromY
				if(fromX> toX){
					var aux = fromX
					fromX = toX
					toX = aux
				}
				for(var j=fromX; j<=toX;j++){
					// parse all the roads for collisions to set the curve corners
					if(!checkCollision(2*j,y)){
						matrix[2*j][y] = 24
					}
					if(!checkCollision(2*j,y+1)){
						matrix[2*j][y+1] = 23
					}
					if(!checkCollision(2*j+1,y)){
						matrix[2*j+1][y] = 24
					}
					if(!checkCollision(2*j+1,y+1)){
						matrix[2*j+1][y+1] = 23
					}
				}
			}		
		}

		for(var i=0; i<matrix.length;i++){
			var matrixLine = ""
			for(var j=0; j<matrix.length;j++){
				checkInnerCurves(i, j)
				matrixLine = matrixLine + "[" + i + "," + j +":"+ matrix[i][j] + "]" + " "
			}
			// console.log(matrixLine)
			// console.log("")
		}	
		// console.log(matrix)
    	return matrix

    }

	Q.TileLayer.extend("MyTileLayer", {
	    load: function(dataAsset) {
        	var data = Q._isString(dataAsset) ?  Q.asset(dataAsset) : dataAsset;
			this.p.tiles = data;
	    }
	})
};