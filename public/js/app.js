define([
	'Console',
	'jQuery',
	'Underscore',
	'Angular',
	//controller
	'services/service',
	'configure',
	'AngularAuth',
	'controllers/UserController',
	'controllers/HeadController'
],function(Console, 
	$ , 
	_ , 
	angular,
	service,
	configure,
	angularAuth,
	User,
	Header){
	var initialize = function(){
		//bootstrap(execute domain,modules)
		//modules can be an object mapping
		angular.module("chew",["http-auth-interceptor","mainService"],configure)
			.controller({
				"login": User.login,
				"headercontrol": Header
			})
			.directive('containerelement',function(){
				var logincol = $("#loginin"),
						logoutcol = $("#logout"),
						logintmp = $("#login-tmp");
				//bind event on containerelemenr attr
				return {
					restrit:'C',
					link: function(scope,element,attrs){

						scope.$on('event:auth-loginConfirmed', function() {
							logintmp.hide();
							logoutcol.show();
							logincol.hide();

		        });
		        scope.$on('event:auth-logoutConfirmed', function() {
							logincol.show();
							logoutcol.hide();

		        });
					}

				}
			});



		angular.bootstrap(window.document,["chew"]);
	};
	return {

		initialize : initialize
	};
});