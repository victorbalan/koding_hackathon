/**
 * GET /contact
 * Contact form page.
 */

exports.game = function(req, res) {	
	var roads = [{fromX: 100, fromY: 100, toX: 100, toY: 150},
		{fromX: 100, fromY: 150, toX: 150, toY: 150},
		{fromX: 150, fromY: 150, toX: 150, toY: 200},
		{fromX: 150, fromY: 200, toX: 100, toY: 250},
		{fromX: 100, fromY: 250, toX: 100, toY: 300}]
	var maxLength = 301 	
  res.render('game', {
    title: 'Game',
    roads: roads,
    matrixMaxLength: maxLength
  });
};