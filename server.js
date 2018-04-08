var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

app.post('/pusher', function(req, res){
  var channel = req.body.channel;
  var data = req.body.data;

  io.emit(channel, data);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ status: "okay", channel: channel, data: data }));
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(5000, function(){
  console.log('listening on *:3000');
});
