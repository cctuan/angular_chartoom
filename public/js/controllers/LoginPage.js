define([
	'jQuery',
	'underscore',
	'Angular',
	'controllers/UserController'
],function($,_,angular , User){

	var controller = function($scope){

		$scope.login = User.login;
	};
	
	return controller;
});