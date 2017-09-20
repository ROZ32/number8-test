import app from '../app';
import view from '../views/main.html';

app.directive('main', function() {
	return {
		restrict: 'EA',
		template: view,
		bindToController: {},
		controllerAs: 'main',
		controller: function() {
			
		}
	};
});
