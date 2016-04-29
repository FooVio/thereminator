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
      },
      magenta: {
        instrument: 'bass',
        parameters: {
          x: 'amp',
          y: 'freq'
        }
      },
      yellow: {
        instrument: 'bass',
        parameters: {
          x: 'amp',
          y: 'freq'
        }
      }
    },
    synth: {
      cyan: {
        instrument: 'synth',
        parameters: {
          x: 'amp',
          y: 'freq'
        }
      },
      magenta: {
        instrument: 'synth',
        parameters: {
          x: 'amp',
          y: 'freq'
        }
      },
      yellow: {
        instrument: 'synth',
        parameters: {
          x: 'amp',
          y: 'freq'
        }
      }
    }
  };
}());
