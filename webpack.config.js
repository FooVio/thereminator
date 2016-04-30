var path = require('path');

var instrumentPath = 'src/js/instruments';

module.exports = {
  entry: {
    bass: path.join(__dirname, instrumentPath, 'bass'),
    drum: path.join(__dirname, instrumentPath, 'drum'),
    synth: path.join(__dirname, instrumentPath, 'synth'),
    server: path.join(__dirname, instrumentPath, 'server')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map'
};
