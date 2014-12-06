var Engine = require('./engine')
var DemoThread = require('./demoThread')
var Intersection = require('./intersection')

module.exports = function(app){
		var NORMAL_ROAD = "NORMAL_ROAD"
		var SPEED_BUMPER = "SPEED_BUMPER"
		var YELLOW_SEMAPHORE = "YELLOW_SEMAPHORE"
		var GREEN_SEMAPHORE = "GREEN_SEMAPHORE"
		var RED_SEMAPHORE = "RED_SEMAPHORE"
		
		var Car = function(){
			this.speed = 50
			this.acceleration = 0
			this.engineCrash = false
			this.engine = new Engine()
			
			this.getSpeed = function(){
				return this.speed
			}
			this.getTorque = function(){
				return this.engine.getTorque()
			}
			this.getAcceleration = function(){
				return this.acceleration
			}

			this.setAcceleration = function(acceleration){
				if(acceleration>this.engine.getMaxAcceleration()){
					console.log("Too much for this car!")
					this.acceleration = this.engine.getMaxAcceleration()
					this.engineCrash = true
				}else{
					this.acceleration = acceleration
				}
			}
			this.setRoadData = function(data){
				this.setAcceleration(0)
				if(this.engineCrash == false){
					if(data == NORMAL_ROAD){
						this.speed = 50
					}
					if(data == SPEED_BUMPER){
						this.setAcceleration(8)
						this.speed = 20
					}
					if(data == RED_SEMAPHORE){
						this.speed = 0
					}
				}else{
					this.speed = 0
					console.log("Engine is crashed. Please fix it before riding")
				}
			}
		}
		
		var car = new Car()
		var ROAD_TEST = [NORMAL_ROAD, SPEED_BUMPER,NORMAL_ROAD, RED_SEMAPHORE, NORMAL_ROAD]
		for(var i=0;i<ROAD_TEST.length;i++){
			car.setRoadData(ROAD_TEST[i])
			console.log(car.getSpeed() + " " + car.getAcceleration() + " " + car.getTorque())
		}
		console.log("Start demo")

		var intersection = new Intersection(1, 1, 1, 1)
		intersection.print()
		var demoThread = new DemoThread(1000)
}