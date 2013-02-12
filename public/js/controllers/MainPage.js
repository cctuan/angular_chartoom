define([
	'Console',
	'jQuery',
	'underscore',
	'Angular',
	'controllers/mainController',
	'controllers/UserController',
	'socket'
],function(Console, $,_, angular,main,user,Socket){
	var controller = function($scope,$routeParams,$http){



		Socket.on("loadHistory",function(msgs){
			_.each(msgs,function(msg){
				$scope.messages.push(msg);
			});
		});

		Socket.on("updateMessage",function(msg){
			$scope.messages.push(msg);
		});

		$scope.msgupdate = function(msg){
			Socket.emit("message",{
				message : msg
			});
		};

		$scope.$on('event:auth-loginConfirmed', function() {

			$scope.logindone = true;
    });
    $scope.$on('event:auth-logoutConfirmed', function() {
    	$scope.logindone = false;
    });

	};
	return controller;

});