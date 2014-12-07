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

$(document).ready(function() {
  	var Q = Quintus()
  			.setup("map")
  			.include("Sprites,UI,Input,Touch,Anim,Scenes,2D")
  			.controls()
  			.touch();

  	Q.Sprite.extend("Car", {
	    init: function(p) {
	        this._super(p, {
	        	sheet: "car",
	        	sprite: "car",
	        	flip: 'y',
	        	frame: 0
	        });         

	        this.add("tween, animation");
	   	}
	});

	Q.animations('car', {
		go: { frames: [0], loop: false},
		stop: { frames: [1], loop: false },
	});

	Q.scene('Game', function(stage) {
		stage.insert(new Q.Repeater({asset: "background.png", speedX: 0.5, speedY: 0.5, scale: 1}))

		stage.insert(new Q.TileLayer({
			dataAsset: 'circuit.json',
			sheet: 'circuit'
		}));

		var car = stage.insert(new Q.Car({x: 175, y:500, scale: 0.4}));
		stage.add("viewport").follow(car, {x:true, y:true});
		stage.viewport.scale = 0.8;

	});
 
 	Q.load("tiles.png, circuit.json, background.png", function() {
 		Q.sheet("circuit", "tiles.png", {tilew: 32, tileh: 32});
 		Q.stageScene("Game");
 	});
});
