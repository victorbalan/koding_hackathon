//= require lib/quintus
//= require lib/quintus_2d
//= require lib/quintus_anim
//= require lib/quintus_audio
//= require lib/quintus_input
//= require lib/quintus_scenes
//= require lib/quintus_sprites
//= require lib/quintus_tmx
//= require lib/quintus_touch
//= require lib/quintus_ui
//= require mapGeneration

var startGame = function(road, matrixMaxLength, eventsp1, eventsp2) {
  	var Q = Quintus()
  			.setup("game")
  			.include("Sprites, UI, Input, Touch, Anim, Scenes, 2D, MapGeneration")
  			.controls()
  			.touch();

	var generatedMap = Q.transformMatrixToMap(road, matrixMaxLength)
	var generatedObstacles = Q.generateObstacles(road, matrixMaxLength)

  	Q.Sprite.extend("Car", {
	    init: function(p) {
	        this._super(p, {
	        	sheet: "car",
	        	sprite: "car",
	        	frame: 0
	        });         
	   	}  	
	});

	Q.animations('car', {
		go: { frames: [1], loop: false},
		stop: { frames: [0], loop: false }
	});

	Q.scene('Game', function(stage) {
		stage.insert(new Q.Repeater({asset: "background.png", scale: 1}))

		stage.insert(new Q.MyTileLayer({
			dataAsset: generatedMap,
			sheet: 'tiles'
		}));

		var car = new Q.Car({x: 100, y:100, scale: 0.4}); 
		var car2 = new Q.Car({x: 150, y:100, scale: 0.4}); 
		car.add("tween, animation");
		car2.add("tween, animation");

		stage.insert(new Q.MyTileLayer({
			dataAsset: generatedObstacles,
			sheet: 'sprites'
		}));

		stage.insert(car);
		stage.insert(car2);
		stage.add("viewport").follow(car, {x:true, y:true});
		stage.viewport.scale = 1.5;
		var selfi = 0
		var alleventsp1 = ""

		for (i = 0; i < eventsp1.length - 1; i++) {
   			car.chain({x: eventsp1[i].x * 64.1, y: eventsp1[i].y * 64.1, angle: - eventsp1[i].angle}, eventsp1[i+1].time - eventsp1[i].time,
   				{
					callback: function() {
						selfi++
						if(eventsp1[selfi]!=undefined){
							if(eventsp1[selfi].carSpeed!=undefined){
								$('#carSpeed').text("Speed: " + eventsp1[selfi].carSpeed + " m/s")
							}
							if(eventsp1[selfi].carAcceleration!=undefined){
								if(eventsp1[selfi].carAcceleration>0){
									car.play('stop')
								}else{
									car.play('stop')
								}
								$('#carAcceleration').text("Acceleration: " + eventsp1[selfi].carAcceleration + " m/s2")
							}
							if(eventsp1[selfi].currentLap!=undefined){
								$('#currentLap').text("Current lap: " + eventsp1[selfi].currentLap)
							}
							if(eventsp1[selfi].currentLap!=undefined){
								$('#currentTime').text("Time: " + eventsp1[selfi].time)
							}
							if(eventsp1[selfi].event!=undefined && eventsp1[selfi].event!="NORMAL"){
								alleventsp1 = alleventsp1 + "Event: " + eventsp1[selfi].event + " at " + eventsp1[selfi].time + "\n" 
									+ "<div class='clear'></div>" 
								$('#event').html(alleventsp1)
							}
						}
					} 
				});
   		}	

		var selfi2 = 0
		for (i = 0; i < eventsp2.length - 1; i++) {
   			car2.chain({x: eventsp2[i].x * 64.15, y: eventsp2[i].y * 64.15, angle: - eventsp2[i].angle}, eventsp2[i+1].time - eventsp2[i].time,
   				{
					callback: function() {
						selfi2++
						if(eventsp2[selfi2]!=undefined){
							if(eventsp2[selfi2].carSpeed!=undefined){
								$('#carSpeed2').text("Speed oponent: " + eventsp2[selfi2].carSpeed + " m/s")
							}
							if(eventsp2[selfi2].carAcceleration!=undefined){
								$('#carAcceleration2').text("Acceleration oponent: " + eventsp2[selfi2].carAcceleration + " m/s2")
							}
						}
					} 
				});
   		}	
	});
 
 	Q.load("car.png, tiles.png, background.png, sprites.png, sprites.json", function() {
 		Q.sheet("sprites", "sprites.png", {tilew: 32, tileh:32});
 		Q.sheet("tiles", "tiles.png", {tilew: 32, tileh: 32});
 		Q.sheet("car", "car.png", {tilew: 63, tileh: 118});
 		Q.stageScene("Game");
 	});
};
