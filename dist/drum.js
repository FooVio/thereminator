/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var sendEvents = __webpack_require__(1);
	  var clients = __webpack_require__(2);

	  window.onload = function() {
	    window.currentInstrument = clients.drum;

	    var video = document.getElementById('video');
	    var canvas = document.getElementById('canvas');
	    var context = canvas.getContext('2d');

	    var tracker = new tracking.ColorTracker(Object.keys(tracking.ColorTracker.knownColors_));
	    tracking.track('#video', tracker, { camera: true });

	    tracker.on('track', sendEvents);
	  };
	}());


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function() {
	  var MIN_VOLUME = 0;
	  var MAX_VOLUME = 1;

	  var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162];
	  var MIN_FREQ = 0;
	  var MAX_FREQ = PENTATONIC_SCALE.length - 1;

	  var lastTime = 0;
	  var MAXDELTA = 500;

	  var dimensions = {
	    x: { min: 0, max: 450 },
	    y: { min: 0, max: 600 }
	  };

	  var DEFAULT_CONFIG = { parameters: {} };

	  var mutedInstruments = [];

	  var socket = io();

	  function map(n, start1, stop1, start2, stop2) {
	    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
	  }

	  function signal(data) {
	    var currentTime = new Date().getTime();
	    var delta = currentTime - lastTime;

	    if (delta > MAXDELTA) {
	      lastTime = currentTime;
	      console.log('event sent:', 'client-message', data);
	      socket.emit('client-message', data);
	    }
	  }

	  function getValue(parameter, dimension, value) {
	    if (parameter === 'freq') {
	      var freqIndex = Math.round(map(value, dimension.min, dimension.max, MAX_FREQ, MIN_FREQ));
	      return PENTATONIC_SCALE[freqIndex];
	    } else if (parameter === 'amp') {
	      return map(value, dimension.min, dimension.max, MAX_VOLUME, MIN_VOLUME)
	    } else {
	      return 0;
	    }
	  }

	  function createEventsFromCard(card) {
	    var config = window.currentInstrument[card.color] || DEFAULT_CONFIG;

	    return Object.keys(config.parameters).map(function(axis) {
	      return {
	        instrument: config.instrument,
	        parameter: config.parameters[axis],
	        value: getValue(config.parameters[axis], dimensions[axis], card[axis])
	      };
	    });
	  }

	  function removedAlreadyMutedInstruments(data) {
	    var newMutedInstruments = [];
	    data.filter(function(event) {
	      if ( event.parameter === 'amp' && value === 0) {
	        newMutedInstruments.push(event.instrument);

	        if (mutedInstruments.indexOf(event.instrument) !== -1) {
	          return false;
	        } else {
	          return true;
	        }
	      } else {
	        return true;
	      }

	    });
	    return data;
	  }

	  function sendEvents(e) {
	    var data = e.data.reduce(function(memo, card) {
	      return memo.concat(createEventsFromCard(card));
	    }, []);

	    data = removedAlreadyMutedInstruments(data);

	    if(data.length !== 0) {
	      signal(data);
	    }
	  }

	  module.exports = sendEvents;
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function(){
	  module.exports = {
	    drum: {
	      magenta: {
	        instrument: 'drums/kick',
	        parameters: {
	          x: 'amp'
	        }
	      },
	      cyan: {
	        instrument: 'drums/snare',
	        parameters: {
	          x: 'amp'
	        }
	      }
	    },
	    bass: {
	      magenta: {
	        instrument: 'bass',
	        parameters: {
	          x: 'amp',
	          y: 'freq'
	        }
	      }
	    }
	  };
	}());


/***/ }
/******/ ]);