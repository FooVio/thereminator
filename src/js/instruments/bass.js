(function() {
  window.onload = function() {
    var sendEvents = require('../camClient.js');
    var clients = require('../clients.js');

    window.currentInstrument = clients.bass;

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ColorTracker(Object.keys(tracking.ColorTracker.knownColors_));
    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', sendEvents);
  };
}());
