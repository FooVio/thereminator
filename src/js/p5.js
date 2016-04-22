var osc;
var freq = 500;
var volume = 0;
var MAXVOLUME = 0.5;

function setValues(e) {
  console.log(1);
  // console.log(JSON.stringify(e));
  if (e.data[0]) {
    freq = map(e.data[0].x,0,width,200,15000);
    volume = map(e.data[0].y,0,height,0,MAXVOLUME);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(255,0,255);
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

function mouseMoved() {
  // freq = map(mouseX,0,width,200,15000);
  // volume = map(mouseY,0,height,0,MAXVOLUME);
  // console.log(freq, volume);
}
