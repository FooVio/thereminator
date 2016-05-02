var sound = require('../lib/sound.js');
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
