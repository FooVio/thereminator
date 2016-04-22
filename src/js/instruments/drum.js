var osc;
var freq = 500;
var volume = 0;
var MAXVOLUME = 0.5;

var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162, 924.986, 1234.708, 1468.324, 1959.978, 2469.416, 2936.648, 3919.954, 4938.834, 6592.552, 7839.908, 9877.666000000001, 13185.101999999999, 15679.818];

var socket = io();

function sendEvent(e) {
  if (e.data.length !== 0) {
    freqIndex = Math.round(map(e.data[0].x,0,width, 0, PENTATONIC_SCALE.length));
    volume = map(e.data[0].y,0,height,0,MAXVOLUME);
  } else {
    volume = 0;
  }
}

window.pubSub.subscribe(sendEvent);
