/**
 * GET /dashboard
 * Dashboard form page.
 */
var request = require('request');

exports.getDashboard = function(req, res) {
  res.render('dashboard', {
    title: 'Dashboard'
  });
};