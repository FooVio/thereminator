var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
console.log(path.join(__dirname, '../..'));

app.use(express.static(path.join(__dirname, '../..')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../..', 'index.html'));
});

io.on('connection', function(socket){
  console.log('a handsome user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
