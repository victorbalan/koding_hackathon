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

var startGame = function(road, matrixMaxLength, events) {
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
		car.add("tween, animation");

		stage.insert(new Q.MyTileLayer({
			dataAsset: generatedObstacles,
			sheet: 'sprites'
		}));

		stage.insert(car);
		stage.add("viewport").follow(car, {x:true, y:true});
		stage.viewport.scale = 1.5;
		var selfi = 0
		var allEvents = ""

		for (i = 0; i < events.length - 1; i++) {
   			car.chain({x: events[i].x * 64.1, y: events[i].y * 64.1, angle: - events[i].angle}, events[i+1].time - events[i].time,
   				{
					callback: function() {
						selfi++
						if(events[selfi]!=undefined){
							if(events[selfi].carSpeed!=undefined){
								$('#carSpeed').text("Speed: " + events[selfi].carSpeed + " m/s")
							}
							if(events[selfi].carAcceleration!=undefined){
								if(events[selfi].carAcceleration>0){
									car.play('stop')
								}else{
									car.play('stop')
								}
								$('#carAcceleration').text("Acceleration: " + events[selfi].carAcceleration + " m/s2")
							}
							if(events[selfi].currentLap!=undefined){
								$('#currentLap').text("Current lap: " + events[selfi].currentLap)
							}
							if(events[selfi].currentLap!=undefined){
								$('#currentTime').text("Time: " + events[selfi].time)
							}
							if(events[selfi].event!=undefined && events[selfi].event!="NORMAL"){
								allEvents = allEvents + "Event: " + events[selfi].event + " at " + events[selfi].time + "\n" 
									+ "<div class='clear'></div>" 
								$('#event').html(allEvents)
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
