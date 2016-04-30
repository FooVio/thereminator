var path = require('path');

var clientPath = 'src/clients';

module.exports = {
  entry: {
    bass: path.join(__dirname, clientPath, 'bass'),
    drum: path.join(__dirname, clientPath, 'drum'),
    synth: path.join(__dirname, clientPath, 'synth'),
    master: path.join(__dirname, clientPath, 'master')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map'
};
