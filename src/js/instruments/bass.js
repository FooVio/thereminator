var osc;
var freq = 500;
var volume = 0;
var MAXVOLUME = 0.5;

var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162];

var socket = io();

var freqIndex = 0;

var kick = e.data.find(function(event) {
  event.color == 'magenta';
});

function checkType(index) {
  if(index) {
    freqIndex = Math.round(map(e.data[index].x,0,width, PENTATONIC_SCALE.length, 0));
    freq = PENTATONIC_SCALE[freqIndex];

    volume = map(e.data[index].y, 0, height, MAXVOLUME, 0);

  } else {
    volume = 0;
  }

  data = {
    instrument: 'bass',
    type: 'amp',
    value: volume,
    freq: PENTATONIC_SCALE[freqIndex]
  };

  socket.emit('client-message', data);
}

function setValues(e) {
  if (e.data.length !== 0) {
    console.log(e.data);
    var magentaIndex = e.data.findIndex(function(ev) {
      ev.color === 'magenta'
    });
    if(magentaIndex !== -1) {
      checkType(magentaIndex);
    }
    var cyanIndex = e.data.findIndex(function(ev) {
      ev.color === 'cyan'
    });
    if(cyanIndex !== -1) {
      checkType(cyanIndex);
    }
}

window.pubSub.subscribe(setValues);
