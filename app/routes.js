import app from './app';
import main from './views/main.html';

app.config(function($stateProvider) {
	$stateProvider
	.state('main', {
		url: '/',
		templateProvider: function () {
			return '<main></main>';
		}
	});
});
