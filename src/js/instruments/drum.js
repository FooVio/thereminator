var osc;
var freq = 500;
var volume = 0;
var MAXVOLUME = 0.5;

var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162];

var socket = io();

var freqIndex = 0;

function checkType(e, index, instrument) {
  if(index!==-1) {
    freqIndex = Math.round(map(e.data[index].x,0,width, PENTATONIC_SCALE.length, 0));
    freq = PENTATONIC_SCALE[freqIndex];

    volume = map(e.data[index].y, 0, height, MAXVOLUME, 0);
    // volume = 1

  } else {
    volume = 0;
  };

  data = {
    instrument: instrument,
    type: 'drum',
    value: volume,
    freq: PENTATONIC_SCALE[freqIndex]
  };

  console.log(data);

  socket.emit('client-message', data);
};

function setValues(e) {
  if (e.data.length !== 0) {
    var magentaIndex = e.data.findIndex(function(ev) {
      return ev.color === 'magenta'
    });
    // if(magentaIndex !== -1) {
      checkType(e, magentaIndex, 'kick');
    // }
    var cyanIndex = e.data.findIndex(function(ev) {
      return ev.color === 'cyan'
    });
    checkType(e, cyanIndex, 'snare');
  }
};

window.pubSub.subscribe(setValues);
