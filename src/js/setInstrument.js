(function(){
  var clients = {
    drum: {
      magenta: {
        instrument: 'drums/kick',
        parameters: {
          x: 'amp'
        }
      },
      cyan: {
        instrument: 'drums/snare',
        parameters: {
          x: 'amp'
        }
      }
    },
    bass: {
      magenta: {
        instrument: 'bass',
        parameters: {
          x: 'amp',
          y: 'freq'
        }
      }
    }
  };

  window.setInstrument = function(instrument) {
    window.currentInstrument = clients[instrument];
  };
}());
