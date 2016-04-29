(function(){
  module.exports = {
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
      cyan: {
        instrument: 'bass',
        parameters: {
          x: 'amp',
          y: 'freq'
        }
      }
    }
  };
}());
