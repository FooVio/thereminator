var osc;
var freq = 500;
var volume = 0;
var MAXVOLUME = 0.5;

var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162, 924.986, 1234.708, 1468.324, 1959.978, 2469.416, 2936.648, 3919.954, 4938.834, 6592.552, 7839.908, 9877.666000000001, 13185.101999999999, 15679.818];

function setValues(e) {
  if (e.data.length !== 0) {
    freqIndex = Math.round(map(e.data[0].x,0,width, 0, PENTATONIC_SCALE.length));
    freq = PENTATONIC_SCALE[freqIndex];

    volume = map(e.data[0].y,0,height,0,MAXVOLUME);
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
  backgroundColor = color(mouseY,0,mouseX);
  background(backgroundColor);
  osc.freq(freq);
  osc.amp(volume);
}
