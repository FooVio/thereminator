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

  function signal(events) {
    var currentTime = new Date().getTime();
    var delta = currentTime - lastTime;

    if (delta > MAXDELTA) {
      lastTime = currentTime;
      console.log('event sent:', 'client-message', events);
      var filteredEvents = removedAlreadyMutedInstruments(events);
      socket.emit('client-message', filteredEvents);
    }
  }

  function getValueForParameter(parameter, range, value) {
    if (parameter === 'freq') {
      var freqIndex = Math.round(map(value, range.min, range.max, MAX_FREQ, MIN_FREQ));
      return PENTATONIC_SCALE[freqIndex];
    } else if (parameter === 'amp') {
      return map(value, range.min, range.max, MAX_VOLUME, MIN_VOLUME)
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
        value: getValueForParameter(config.parameters[axis], dimensions[axis], card[axis])
      };
    });
  }

  function removedAlreadyMutedInstruments(events) {
    var newMutedInstruments = [];
    return events.filter(function(event) {
      if ( event.parameter === 'amp' && event.value === 0) {
        newMutedInstruments.push(event.instrument);

        return (mutedInstruments.indexOf(event.instrument) < 0) ? true : false;
      } else {
        return true;
      }
    });
  }

  function getEventsForMissingCards(availableCards) {
    var supportedColors = Object.keys(window.currentInstrument);
    var availableColors = availableCards.map(function(card) {
      return card.color;
    });

    var missingColors = supportedColors.filter(function(color) {
      return availableColors.indexOf(i) < 0;
    });

    return missingColors.map(function(color) {
      return {
        instrument: window.currentInstrument[color],
        parameter: 'amp',
        value: MIN_VOLUME
      };
    });
  }

  function sendEvents(e) {
    var eventsFromCam = e.data.reduce(function(memo, card) {
      return memo.concat(createEventsFromCard(card));
    }, []);

    var totalEvents = getEventsForMissingCards().concat(eventsFromCam);

    if(totalEvents.length !== 0) {
      signal(totalEvents);
    }
  }

  module.exports = sendEvents;
}());
