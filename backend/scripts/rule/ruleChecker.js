var ObstacleType = require('../road/obstacleType')

module.exports.check = function(obstacleType, carSpeed){
	switch(obstacleType){
		case ObstacleType.POTHOLE:
			if(carSpeed>25){
				return {fail: true, reason: 'Car broken due to hole fuck'}
			}else{
				return {fail: false}
			}
			break
		case ObstacleType.SPEEDLIMIT50:
			if(carSpeed>50){
				return {fail: true, reason: 'The fucking police man stopped you and fucked your ass.'}
			}else{
				return {fail: false}
			}
			break
		case ObstacleType.SPEEDLIMIT90:
			if(carSpeed>90){
				return {fail: true, reason: 'Don`t you know what 90 means? Pay a fine now, Idiot!'}
			}else{
				return {fail: false}
			}
			break
		case ObstacleType.SPEEDLIMIT120:
			if(carSpeed>120){
				return {fail: true, reason: 'I know you like speed..but 120 is enough.'}
			}else{
				return {fail: false}
			}
			break
		case ObstacleType.NOSPEEDLIMIT:
			if(carSpeed>200){
				return {fail: true, reason: 'I fucked you. The speed limit is actually 200.'}
			}else{
				return {fail: false}
			}
			break
		default:
			return {fail: false}
			break
	}
}