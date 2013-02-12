define([
	'Console',
	'jQuery',
	'underscore',
	'Angular'
],function(Console, $,_ ,angular){
	var controller = function($scope,$routeParams,$http,authService){
		$scope.loginrequired = true;
		$scope.logindisplay = false;
		$scope.logindialog = function(){
			$scope.logindisplay = !$scope.logindisplay;
			$scope.logindisplay ? $("#login-tmp").show() : $("#login-tmp").hide();
		};
		
		$scope.logout = function(){
			$http.get("/logout").success(function(){
				authService.logoutConfirmed();
			});
		};
	};
	return controller;

});