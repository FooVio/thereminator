/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var sound = __webpack_require__(3);
	var video = __webpack_require__(4);
	
	function setup() {
	  // SOUND
	  sound.init();
	  sound.mute();
	
	  var socket = io();
	  socket.on('server-message', sound.process);
	
	  // VIDEO
	  video.init();
	}
	
	function draw() {
	  video.draw();
	}
	
	
	function windowResized() {
	  resizeCanvas(windowWidth, windowHeight);
	  background(0);
	}


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	(function() {
	  var instruments = {
	    drums: {},
	    bass: {},
	    synth: {}
	  }
	
	  function init() {
	    Gibber.init() // REQUIRED!
	    Gibber.scale.root.seq( ['c4','eb4'], 2)
	
	    instruments['drums'] = EDrums('xoxo')
	    instruments['drums'].snare.snappy = 1
	
	    instruments['bass'] = Mono('bass').note.seq( [0,7], 1/8 )
	
	    instruments['synth'] = Mono('easyfx')
	      .note.seq( Rndi(0,12), [1/4,1/8,1/2,1,2].rnd( 1/8,4 ) )
	  }
	
	  function mute() {
	    amp('drums',1);
	    drumamp('kick',0);
	    drumamp('snare',0);
	    amp('bass',0);
	    amp('synth',0);
	  }
	
	  function amp(name, volume) {
	    instruments[name].amp = volume;
	  }
	
	  function drumamp(drumname, volume) {
	    instruments['drums'][drumname].amp = volume;
	  }
	
	  function process(message) {
	    console.log(message);
	    var instrument = message.instrument;
	    switch (message.type) {
	      case 'amp':
	        if (instrument.match(/drums\//)) {
	          drumamp(instrument.match(/drums\/(.+)/)[1], message.value);
	        } else {
	          amp(instrument, message.value);
	        }
	        break;
	      default:
	        amp(instrument, message.value);
	        break;
	    }
	  }
	
	  module.exports = {
	    init: init,
	    mute: mute,
	    process: process
	  };
	
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	(function() {
	  var amplitude;
	
	  var backgroundColor;
	
	  // rectangle parameters
	  var rectRotate = true;
	  var rectMin = 15;
	  var rectOffset = 20;
	  var numRects = 10;
	
	  // :: Beat Detect Variables
	  // how many draw loop frames before the beatCutoff starts to decay
	  // so that another beat can be triggered.
	  // frameRate() is usually around 60 frames per second,
	  // so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
	  // we wont respond to every beat.
	  var beatHoldFrames = 30;
	
	  // what amplitude level can trigger a beat?
	  var beatThreshold = 0.11;
	
	  // When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
	  // Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
	  var beatCutoff = 0;
	  var beatDecayRate = 0.98; // how fast does beat cutoff decay?
	  var framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.
	
	
	  function init() {
	    c = createCanvas(windowWidth, windowHeight);
	    noStroke();
	    rectMode(CENTER);
	
	    amplitude = new p5.Amplitude();
	
	    amplitude.smooth(0.9);
	  }
	
	  function detectBeat(level) {
	    if (level  > beatCutoff && level > beatThreshold){
	      onBeat();
	      beatCutoff = level *1.2;
	      framesSinceLastBeat = 0;
	    } else{
	      if (framesSinceLastBeat <= beatHoldFrames){
	        framesSinceLastBeat ++;
	      }
	      else{
	        beatCutoff *= beatDecayRate;
	        beatCutoff = Math.max(beatCutoff, beatThreshold);
	      }
	    }
	  }
	
	  function onBeat() {
	    backgroundColor = color( random(0,255), random(0,255), random(0,255) );
	    rectRotate = !rectRotate;
	  }
	
	  function draw() {
	    background(backgroundColor);
	
	    var level = amplitude.getLevel();
	    detectBeat(level);
	
	    // distort the rectangle based based on the amp
	    var distortDiam = map(level, 0, 1, 0, 1200);
	    var w = rectMin;
	    var h = rectMin;
	
	    // distortion direction shifts each beat
	    if (rectRotate) {
	      var rotation = PI/ 2;
	    } else {
	      var rotation = PI/ 3;
	    }
	
	    // rotate the drawing coordinates to rectCenter position
	    var rectCenter = createVector(width/3, height/2);
	
	    push();
	
	      // draw the rectangles
	      for (var i = 0; i < numRects; i++) {
	        var x = rectCenter.x + rectOffset * i;
	        var y = rectCenter.y + distortDiam/2;
	        // rotate around the center of this rectangle
	        translate(x, y);
	        rotate(rotation);
	        rect(0, 0, rectMin, rectMin + distortDiam);
	      }
	    pop();
	  }
	
	  module.exports = {
	    init: init,
	    draw: draw
	  };
	
	}());


/***/ }
/******/ ]);
//# sourceMappingURL=master.js.map