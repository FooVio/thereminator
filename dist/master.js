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

	var sound = __webpack_require__(4);
	// var video = require('../lib/video.js');
	
	function setup() {
	  // SOUND
	  sound.init();
	  sound.mute();
	
	  var socket = io();
	  socket.on('server-message', sound.process);
	
	  // VIDEO
	  // video.init();
	}
	
	// function draw() {
	//   video.draw();
	// }
	
	
	// function windowResized() {
	//   resizeCanvas(windowWidth, windowHeight);
	//   background(0);
	// }
	
	window.setup = setup;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=master.js.map