var express = require('express'),
		io = require('socket.io'),
		co = require("./main");


var app = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/public');
  app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

var params = {hostroom : "default"};

var localUser = {};
var rooms = [],
		roomid = 1;
var history = {};


// Routes

app.get('/logout',function(req,res){
  res.json("200");
});

app.post('/login',function(req,res){
  console.log(req);
  res.json("200",{login:true});
});

app.get('/', function(req, res) {
 	var params = req.params.maproom;
 			room = {
 				hostroom : params||"publicroom"
 			};
 	rooms.push(room);
	res.sendfile(__dirname +'/public/index.html');

	co.setParams(room);
});

app.get('/:maproom', function(req, res) {
  var params = req.params.maproom,
			room = {
 				hostroom : params
 			};

	res.sendfile(__dirname +'/public/index.html');
  co.setParams(room);

});

io = io.listen(app);
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

co.init(io,params);
