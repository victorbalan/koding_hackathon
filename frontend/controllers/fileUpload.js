/**
 * GET /fileUpload
 * FileUpload form page.
 */
var request = require('request');
var fs = require('fs')
var Car = require('../models/Car')


exports.getFileUpload = function(req, res) {
  res.render('fileUpload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = function(req, res, next) {
	// req.assert('fileToUpload', 'No file selected').notEmpty();
	fs.readFile(req.files.file.path, 'utf8', function (err,data) {
	  if (err) {
	    console.log(err);
	  }else{
	  	saveCar(req.session.passport.user, data)
	  	request.post('http://localhost:8081/car/check', 
		{form: {data: data} },
		function(error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body)
	        }
   		});
	  }
	});
	
 	res.redirect('/fileUpload');
};

var saveCar = function(userId, carModel){
		var car = new Car({
			userId: userId,
			carModel: carModel,
			name: "Reno"
		})
		car.save(function(err){
			if(err){
			}else{	
			}
		})
}