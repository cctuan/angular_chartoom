define([
  '/socket.io/socket.io.js'
],function(){

  var socket = io.connect(document.location.origin);
  var socketon = function(callback){
    socket.on("connect",callback);
  };
  return socket;
});
