var osc;
var freq = 500;
var volume = 0;
var MAXVOLUME = 0.5;

var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162];

var socket = io();

var freqIndex = 0;

function setValues(e) {
  if (e.data.length !== 0) {
    freqIndex = Math.round(map(e.data[0].x,0,width, PENTATONIC_SCALE.length, 0));
    freq = PENTATONIC_SCALE[freqIndex];

    volume = map(e.data[0].y, 0, height, MAXVOLUME, 0);
  } else {
    volume = 0;
  }

  data = {
    instrument: 'snare',
    type: 'drums',
    value: volume,
    freq: PENTATONIC_SCALE[freqIndex]
  };
  console.log(data);
  socket.emit('client-message', data);
}

window.pubSub.subscribe(setValues);
