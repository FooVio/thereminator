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
      if ( event.parameter === 'amp' && event.value === 0) {
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
