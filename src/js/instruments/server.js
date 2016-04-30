var sound = require('../sound.js');
var video = require('../video.js');

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
