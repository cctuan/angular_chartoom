var history = {};

var init = function(io,socket,params){
	if(history[""+params.hostroom]!==undefined){
    socket.emit('loadHistory',history[""+params.hostroom]);
  }
  socket.on('message',function(msg){
    var message = {};
    message.message = htmlEntities(msg.message);
    message.userid = htmlEntities(msg.userid);
    message.timestamp = new Date();
    
    if(history[""+params.hostroom] === undefined){
      history[""+params.hostroom] = [];
    }
    history[""+params.hostroom].push(message);

    io.sockets.in(socket.room.name).emit('updateMessage',message);
  });


}
function htmlEntities(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
module.exports = {
  init : init
}