(function() {
  var instruments = {
    drums: {},
    bass: {},
    synth: {}
  }

  function init() {
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

  function amp(name, volume) {
    instruments[name].amp = volume;
  }

  function drumamp(drumname, volume) {
    instruments['drums'][drumname].amp = volume;
  }

  function process(message) {
    console.log(message);
    var instrument = message.instrument;
    switch (message.type) {
      case 'amp':
        if (instrument.match(/drums\//)) {
          drumamp(instrument.match(/drums\/(.+)/)[1], message.value);
        } else {
          amp(instrument, message.value);
        }
        break;
      default:
        amp(instrument, message.value);
        break;
    }
  }

  module.exports = {
    init: init,
    mute: mute,
    process: process
  };

}());
