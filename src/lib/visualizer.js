var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var drawVisual; // requestAnimationFrame
var canvas = document.getElementById('canvas');
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.getUserMedia (
  // constraints - only audio needed for this app
  {
    audio: true
  },

  // Success callback
  function(stream) {
    source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    visualize(stream);
  },

  // Error callback
  function(err) {
    console.log('The following getUserMedia error occured: ' + err);
  }
);

function visualize(stream) {
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var canvasCtx = canvas.getContext('2d');

  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount; // half the FFT value
  var dataArray = new Uint8Array(bufferLength); // create an array to store the data

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  var fps = 100;
  function draw() {
    setTimeout(function() {
      drawVisual = requestAnimationFrame(draw);
    // Drawing code goes here
    }, 1000 / fps);
    analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

    canvasCtx.fillStyle = 'rgb(51, 77, 92)'; // draw wave with canvas
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 4;
    canvasCtx.strokeStyle = 'rgb(239, 201, 76)';

    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT/2;

      i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);
      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
  };

  draw();
}
