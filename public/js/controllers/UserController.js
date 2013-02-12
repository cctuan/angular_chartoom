define([
	'Console',
	'jQuery',
	'underscore',
	'Angular',
	'socket',
	'controllers/mainController'
],function(Console, $,_, angular,Socket, main){
	var controller = function($scope,$http){
		console.log($scope);
		$scope.chewchew = main;
	};
	var loginController = function($scope,$routeParams,$http,authService){

		$scope.logintmp = {
			url : "/templates/login.html"
		};

		$scope.closelogin = function(e){
			$("#loginin").trigger("click");
		};
		
		$scope.submit = function(){
			if(this.email_col && this.pwd_col){
				var email = this.email_col,
						pwd = this.pwd_col;
				$http({
					method: "POST",
					url: "/login",
					data: {
						email: email,
						pwd: pwd
					}
				})
					.success(function(data){
						Socket.emit("addUser",{
							username : email,
							time : new Date(),
							room : "default"
						});
						authService.loginConfirmed();
					});
			}
		};
		
		
	};
	return {
		controller : controller,
		login      : loginController
	};

});