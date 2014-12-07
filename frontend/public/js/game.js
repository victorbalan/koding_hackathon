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
	console.log(road);
	console.log(matrixMaxLength);
	console.log(events);
  	var Q = Quintus()
  			.setup("game")
  			.include("Sprites, UI, Input, Touch, Anim, Scenes, 2D, Test")
  			.controls()
  			.touch();

	var generatedMap = Q.transformMatrixToMap(road, matrixMaxLength)

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
		stop: { frames: [0], loop: false },
	});

	Q.scene('Game', function(stage) {
		stage.insert(new Q.Repeater({asset: "background.png", scale: 1}))

		stage.insert(new Q.MyTileLayer({
			dataAsset: generatedMap,
			sheet: 'tiles'
		}));

		var car = new Q.Car({x: 100, y:100, scale: 0.4}); 
		car.add("tween");

		stage.insert(car);
		stage.add("viewport").follow(car, {x:true, y:true});

		stage.viewport.scale = 0.5;

		for (i = 0; i < events.length - 1; i++) {
   			car.chain({x: events[i].x * 64.25, y: events[i].y * 64.25, angle: - events[i].angle}, events[i+1].time - events[i].time);
   		}	
	});
 
 	Q.load("car.png, tiles.png, background.png", function() {
 		Q.sheet("tiles", "tiles.png", {tilew: 32, tileh: 32});
 		Q.sheet("car", "car.png", {tilew: 63, tileh: 118});
 		Q.stageScene("Game");
 	});
};
