window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ColorTracker(Object.keys(tracking.ColorTracker.knownColors_));
  tracking.track('#video', tracker, { camera: true });

  pubSub.init(tracker.on.bind(tracker, 'track'));
};
