var request = require('request');
/**
 * GET /fileUpload
 * FileUpload form page.
 */
 exports.getGarage = function(req, res) {
  res.render('garage', {
    title: 'Garage'
  });
};