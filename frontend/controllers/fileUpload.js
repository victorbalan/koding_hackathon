/**
 * GET /fileUpload
 * FileUpload form page.
 */
var request = require('request');
var fs = require('fs')


exports.getFileUpload = function(req, res) {
  res.render('fileUpload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = function(req, res, next) {
	// req.assert('fileToUpload', 'No file selected').notEmpty();
	console.log(req.files);

	fs.readFile(req.files.file.path, 'utf8', function (err,data) {
	  if (err) {
	    console.log(err);
	  }else{
	  	request.post('http://localhost:8081/car/check', 
		{form: {data: data} },
		function(error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body)
	        }
   		});
	  	console.log(data);
	  }
	});
	
	//console.log();
 	res.redirect('/fileUpload');
};