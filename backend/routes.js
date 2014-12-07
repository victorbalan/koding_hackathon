var stringToModule = require('./services/stringToModule')
var CarTestingService = require('./services/carTestingService')
var MapMockingService = require('./scripts/road/mapMockingService')


module.exports = function(app){
	app.post('/car/check', function(req, res){
		var Car = stringToModule(req.body.data)
		
		CarTestingService.testUserCar(Car, MapMockingService.getMockedBaseMap(), function(response){
			//console.log(response)
			res.send(response)
		})
	})

	app.post('/car/info', function(req, res){
		var Car = stringToModule(req.body.data)
		
		CarTestingService.getCarJsonFromConfigFile(Car, req.body.data, function(response){
			//console.log(response)
			res.send(response)
		})
	})

	app.post('/car/test', function(req, res){
		var mapType = req.body.map
		//console.log(req.body.carModel)
		var Car = stringToModule(req.body.carModel)

		CarTestingService.testUserCar(Car, MapMockingService.getCircuitMap(), function(response){
			//console.log(response)
			res.send(response)
		})
	})

	app.get('/base', function(req, res){
		res.send(MapMockingService.getRoadsForBaseMap())
	})

	app.get('/sprint', function(req, res){

	})

	app.get('/circuit', function(req, res){

	})

	app.get('/level/:nr', function(req, res){
		var levelNumber = req.params.nr
		var mapType = req.body.map
		//console.log(req.body.carModel)
		var Car = stringToModule(req.body.carModel)

		CarTestingService.testUserCar(Car, MapMockingService.getLevelMap(levelNumber), function(response){
			//console.log(response)
			res.send(response)
		})

	})
}