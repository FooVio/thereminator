var osc;
var freq = 500;
var volume = 0;
var MAXVOLUME = 0.5;

var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162];

function setValues(e) {
  if (e.data.length !== 0) {
    freqIndex = Math.round(map(e.data[0].x,0,width, PENTATONIC_SCALE.length, 0));
    freq = PENTATONIC_SCALE[freqIndex];

    volume = map(e.data[0].y, 0, height, MAXVOLUME, 0);
  } else {
    volume = 0;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(color(255,255,255));
  textAlign(CENTER);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(freq);
  osc.amp(volume);
  osc.start();

  window.pubSub.subscribe(setValues);
}

function draw() {
  osc.freq(freq);
  osc.amp(volume);
}
