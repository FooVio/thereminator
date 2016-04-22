var volume = 0;
var MAXVOLUME = 0.5;

// var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162, 924.986, 1234.708, 1468.324, 1959.978, 2469.416, 2936.648, 3919.954, 4938.834, 6592.552, 7839.908, 9877.666000000001, 13185.101999999999, 15679.818];
var PENTATONIC_SCALE = [183.54, 231.246, 275.0, 367.08, 462.494, 617.354, 734.162];
var instruments = ['short', 'lead', 'winsome', 'bass', 'bass2', 'edgy', 'easy', 'easyfx', 'dark', 'dark2', 'noise'];

var currentInstument = null;

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

function sendEvent(e) {
  if (e.data.length !== 0) {
    var freqIndex = Math.round(map(e.data[0].x, 0, width, PENTATONIC_SCALE.length, 0));
    volume = map(e.data[0].y, 0, height, MAXVOLUME, 0);
  } else {
    volume = 0;
  }

  socket.emit('client-message', {
    instrument: 'mono',
    type: currentInstument,
    volume: volume,
    freq: PENTATONIC_SCALE[freqIndex]
  });
}

window.pubSub.subscribe(sendEvent);
