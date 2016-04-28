var volume = 0;
var MAXVOLUME = 0.5;

// var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162, 924.986, 1234.708, 1468.324, 1959.978, 2469.416, 2936.648, 3919.954, 4938.834, 6592.552, 7839.908, 9877.666000000001, 13185.101999999999, 15679.818];
var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162];
var instruments = ['drums','bass','synth'];
var parameters  = ['amp','kick','snare'];

var currentInstument = instruments[0];
var currentParameter = parameters[0];

var socket = io();

window.setInstruments = function() {
  var ul = document.querySelector('ul.instruments');

  instruments.forEach(function(instrument) {
    var li = document.createElement('li');

    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'instruments';

    var span = document.createElement('span');
    span.innerHTML = '  ' + instrument;

    li.appendChild(radioButton);
    li.appendChild(span);

    li.addEventListener('click', function() {
      currentInstument = instrument;
    });

    ul.appendChild(li);
  });
}

window.setParams = function() {
  var ul = document.querySelector('ul.params');

  parameters.forEach(function(param) {
    var li = document.createElement('li');

    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'instruments';

    var span = document.createElement('span');
    span.innerHTML = '  ' + param;

    li.appendChild(radioButton);
    li.appendChild(span);

    li.addEventListener('click', function() {
      currentParameter = param;
    });

    ul.appendChild(li);
  });
}

function sendEvent(e) {
  if (e.data.length !== 0) {
    var freqIndex = Math.round(map(e.data[0].x, 0, width, PENTATONIC_SCALE.length, 0));
    volume = map(e.data[0].y, 0, height, MAXVOLUME, 0);
  } else {
    volume = 0;
  }

  data = {
    instrument: currentInstument,
    type: currentParameter,
    value: volume,
    freq: PENTATONIC_SCALE[freqIndex]
  };
  console.log(data);

  socket.emit('client-message', data);
}

window.pubSub.subscribe(sendEvent);
