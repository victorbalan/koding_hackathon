var stringToModule = require('./services/stringToModule')
var CarTestingService = require('./services/carTestingService')


module.exports = function(app){
	app.post('/car/check', function(req, res){
		var Car = stringToModule(req.body.data)
		
		CarTestingService.testUserCar(Car, function(response){
			console.log(response)
			res.send(response)
		})
	})
}