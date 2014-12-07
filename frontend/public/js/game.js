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
  			.setup("game")
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
			dataAsset: 'tiles.json',
			sheet: 'tiles'
		}));

		var car = stage.insert(new Q.Car({x: 175, y:500, scale: 0.4}));
		stage.add("viewport").follow(car, {x:true, y:true});
		stage.viewport.scale = 1;
		
		var frame = stage.insert(new Q.UI.Button({on: false, x:175, y: 500, label: "bottom_right", fill: "#ddddff"}));
		
		frame.on("click", function() {
			if(this.p.label == "bottom_right"){
				car.animate({x: 175, y: 200});
				this.p.label = "bottom_left";
			} else if(this.p.label == "bottom_left"){
				car.animate({x: 30, y: 260, angle: 360}, 4, Q.Easing.Quadratic.Out);
				this.p.label = "center";
			} else if(this.p.label == "center"){
				car.animate({x: 150, y: 150, scale: 2}, 1, Q.Easing.Quadratic.InOut);
				this.p.label = "reset";
			} else if(this.p.label == "reset"){
				car.animate({x: 150, y: 150, scale: 0.4, angle: 0}, 6, Q.Easing.Quadratic.In, {delay: 2});
				this.p.label = "bottom_right";
			}
		});

		car.play("go");
	});
 
 	Q.load("car.png, car.json, tiles.png, tiles.json, background.png", function() {
 		Q.sheet("tiles", "tiles.png", {tilew: 32, tileh: 32});
 		Q.sheet("car", "car.png", {tilew: 60, tileh: 120});
 		Q.stageScene("Game");
 	});
});
