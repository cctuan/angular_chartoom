"use strict";

require.config({
	paths: {
		Console: 'libs/console/console'
		, jQuery: 'libs/jquery/jquery'//'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min'
		, Underscore: 'libs/underscore/underscore'
		, Angular: 'libs/angular/angular'
		, bootstrap: 'libs/bootstrap'
		, jqueryui: 'libs/jquery-ui'
		, socket: 'libs/socket'
		, session: "libs/sessionStorage"
		, AngularAuth: "libs/angular/http-auth-interceptor"
	}
	, priority: [ 
		"Console"
		, "jQuery"
		, "Underscore"
		, "jqueryui"
		, "bootstrap"
		, "Angular" 
		, "socket"
		, "session"
		, "AngularAuth"

	]
	, urlArgs: 'v=1.0'
});

require([
	// Standard Libs
	'require'
	, 'Console'
	, 'jQuery'
	, 'Underscore'
	, 'Angular'
], function (require, Console, $, _, angular) {
	Console.group("Bootstrap dependencies loaded. Starting bootstrap.");
	Console.info("Console", Console);
	Console.info("jQuery", $);
	Console.info("Underscore: ", _);
	Console.info("Angular: ", angular);

	require(['app'], function (App) {
		Console.group("Starting bootstrap.");
		Console.info("App: ", App);

		App.initialize();
		
		Console.groupEnd();
	});

	Console.groupEnd();
});