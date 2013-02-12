var comap = require("./map"),
		cochat = require("./chat");

var params = {};

var setParams = function(pa){
	params = pa;
};

var init = function( io , params){
	var localUser 	= {},
			rooms 			= [],
			userid = 1;

	io.sockets.on('connection',function(socket){
		socket.room = {name :'',user :{}};
		socket.emit('room',params||null);
		socket.on('addUser',function(message){
			
			var username = htmlEntities(message.username);//parse username to noremal string
			socket.userid = userid++;
			socket.username = username;

			socket.room.name = params.hostroom;

			rooms.push(params);

			socket.room.user[socket.userid] = message;

			if(localUser[""+params.hostroom]===undefined){
				localUser[""+params.hostroom] = {};
			}
			localUser[""+params.hostroom][socket.userid] = message;

			socket.join(params.hostroom);
			// emit new User information 
			socket.emit("userAdded",{
				user : message,
				room : socket.room,
				timestamp : new Date()
			});
			// broadcast the room of updateUsers event for new user list
			io.sockets.in(socket.room.name).emit("updateUsers",{
				users : localUser[""+params.hostroom]
			});

			cochat.init(io,socket,params);
		});
		socket.on("disconnect",function(){
			delete socket.room.user[socket.userid];

			if(localUser[""+params.hostroom]!==undefined){
				delete localUser[""+params.hostroom][""+socket.userid];
			}

			io.sockets.in(socket.room.name).emit("updateUsers",{
				users : localUser[""+params.hostroom]
			});
			socket.leave(socket.room.name);
		});

	});


};
function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
module.exports = {
	setParams : setParams,
	init : init
}