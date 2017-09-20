import angular from 'angular';

import 'angular-ui-router';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';

const app = angular.module('calendarApp', [
	'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
});

export default app;