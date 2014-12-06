var stringToModule = require('./services/stringToModule')
var CarTestingService = require('./services/carTestingService')


module.exports = function(app){

	app.post('/carmock', function(req, res){
		var contents = req.body.fileContents

		contents = "module.exports = function(){ \n" +
					"	this.x = 'MAMA E GRASA' \n" +
					"	this.getX = function(){ \n" +
					"		return this.x \n" +
					"	} \n" +
					"}" 
		var Car = stringToModule(contents)
		var c = new Car()
		
		res.send(200)
	})

	app.post('/car/check', function(req, res){
		var Car = stringToModule(req.body.data)
		
		CarTestingService.testUserCar(Car, function(response){
			console.log(response)
			res.send(response)
		})
	})
}