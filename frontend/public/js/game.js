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

var events = [ { event: 'NORMAL',
    time: 0.2,
    x: 100,
    y: 100.4,
    angle: 0,
    carSpeed: 4 },
  { event: 'NORMAL',
    time: 0.5,
    x: 100,
    y: 104,
    angle: 0,
    carSpeed: 16 },
  { event: 'NORMAL',
    time: 0.7999999999999999,
    x: 100,
    y: 111.2,
    angle: 0,
    carSpeed: 28 },
  { event: 'NORMAL',
    time: 1.0999999999999999,
    x: 100,
    y: 122,
    angle: 0,
    carSpeed: 40 },
  { event: 'NORMAL',
    time: 1.4000000000000001,
    x: 100,
    y: 136.4,
    angle: 0,
    carSpeed: 52 },
  { event: 'POTHOLE',
    time: 1.5000000000000002,
    carPosX: 100,
    carPosY: 145,
    carAngle: 0,
    carSpeed: 56 },
  { event: 'POTHOLE',
    time: 1.6000000000000003,
    carPosX: 100,
    carPosY: 145,
    carAngle: 0,
    carSpeed: 60 },
  { event: 'NORMAL',
    time: 1.7000000000000004,
    x: 100,
    y: 150,
    angle: 45,
    carSpeed: 64 },
  { event: 'POTHOLE',
    time: 1.9000000000000006,
    carPosX: 115,
    carPosY: 150,
    carAngle: 0,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 2.0000000000000004,
    x: 120.8,
    y: 150,
    angle: 45,
    carSpeed: 70 },
  { event: 'POTHOLE',
    time: 2.0000000000000004,
    carPosX: 115,
    carPosY: 150,
    carAngle: 0,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 2.3000000000000007,
    x: 141.8,
    y: 150,
    angle: 0,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 2.600000000000001,
    x: 150,
    y: 157,
    angle: -45,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 2.9000000000000012,
    x: 150,
    y: 178,
    angle: -45,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 3.2000000000000015,
    x: 150,
    y: 199,
    angle: 0,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 3.5000000000000018,
    x: 140.1005050633883,
    y: 209.8994949366117,
    angle: -22.5,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 3.800000000000002,
    x: 125.2512626584708,
    y: 224.74873734152922,
    angle: -22.5,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 4.100000000000001,
    x: 110.4020202535533,
    y: 239.59797974644673,
    angle: 0,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 4.4,
    x: 100,
    y: 257,
    angle: 22.5,
    carSpeed: 70 },
  { event: 'NORMAL',
    time: 4.699999999999999,
    x: 100,
    y: 277.84999999999997,
    angle: 22.5,
    carSpeed: 69 },
  { event: 'NORMAL',
    time: 4.999999999999998,
    x: 100,
    y: 298.25,
    angle: 0,
    carSpeed: 67.5 },
  { event: 'FINISH',
    time: 4.999999999999998,
    x: 100,
    y: 298.25,
    angle: 0,
    carSpeed: 67.5 } ];

$(document).ready(function() {
  	var Q = Quintus()
  			.setup("game")
  			.include("Sprites, UI, Input, Touch, Anim, Scenes, 2D")
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
	   	},

	   	animateCar: function(events) {
	   		for (i = 0; i < events.length - 1; i++) {
	   			this.chain({x: events[i].x, y: events[i].y});
	   		}
	   	}
	});

	Q.animations('car', {
		go: { frames: [1], loop: false},
		stop: { frames: [0], loop: false },
	});

	Q.scene('Game', function(stage) {
		stage.insert(new Q.Repeater({asset: "background.png", scale: 1}))

		/*stage.insert(new Q.TileLayer({
			dataAsset: 'circuit.json',
			sheet: 'tiles'
		}));*/

		var car = new Q.Car({x: 100, y:100, scale: 0.4}); 
		car.add("tween");

		stage.insert(car);
		stage.add("viewport").follow(car, {x:true, y:true});

		stage.viewport.scale = 1;

		car.animateCar(events);
	});
 
 	Q.load("car.png, car.json, tiles.png, circuit.json, background.png", function() {
 		Q.sheet("tiles", "tiles.png", {tilew: 32, tileh: 32});
 		Q.sheet("car", "car.png", {tilew: 63, tileh: 118});
 		Q.stageScene("Game");
 	});
});
