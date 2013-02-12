define([
	// Standard Libs
	'Console'		// lib/console/console
	, 'Underscore'	// lib/underscore/underscore
	, 'jQuery'
	, 'controllers/MainPage'
	, 'controllers/LoginPage'
	// Application Controller
	,  // Main Application Controller - contains routing logic
		
		'Angular'
], function (Console, _,$, MainPage ,LoginPage, angular){
	"use strict";
	var main = angular.module("mainService",['chew'])

	.config(['$routeProvider',function($routeProvider){
		console.log($routeProvider);
		$routeProvider
			.when('/',{
				templateUrl : '/templates/Main.html',
				controller : MainPage,
				
			})
			.otherwise({
				redirectTo:'/'
			});
	}]);

});