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
		var contents = req.body.fileContents
		var toBeParsed = ""
		for(var i=1;i<contents.length-1; i++){
			if("\\" == contents[i] && "n" == contents[i+1]){
				toBeParsed += "\n"
				i++
			}else{
				toBeParsed += contents[i]
			}
		}

		var Car = stringToModule(toBeParsed)
		
		CarTestingService.testUserCar(Car, function(response){
			console.log(response)
			res.send(response)
		})
	})
}