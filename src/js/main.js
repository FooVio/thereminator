var instruments = {
  drums: {},
  bass: {},
  synth: {}
}

function initSound() {
  Gibber.init() // REQUIRED!
  Gibber.scale.root.seq( ['c4','eb4'], 2)

  instruments['drums'] = EDrums('xoxo')
  instruments['drums'].snare.snappy = 1

  instruments['bass'] = Mono('bass').note.seq( [0,7], 1/8 )

  instruments['synth'] = Mono('easyfx')
    .note.seq( Rndi(0,12), [1/4,1/8,1/2,1,2].rnd( 1/8,4 ) )
}

function mute() {
  amp('drums',1);
  drumamp('kick',0);
  drumamp('snare',0);
  amp('bass',0);
  amp('synth',0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(255,0,255);

  initSound();
  mute();

  var socket = io();
  socket.on('server-message', function(message){
    console.log(message);
    var instrument = message.instrument;
    switch (message.type) {
      case 'amp':
        amp(instrument, message.value);
        break;
      case 'drums':
        drumamp(instrument, message.value);
        break;
      default:
        amp(instrument, message.value);
        break;
    }
  });
}

function draw() {
  backgroundColor = color(mouseY,0,mouseX);
  background(backgroundColor);
}

function amp(name, volume) {
  instruments[name].amp = volume;
}

function drumamp(drumname, volume) {
  instruments['drums'][drumname].amp = volume;
}
