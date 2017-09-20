import calendar from 'calendar';

import app from '../app';
import view from '../views/main.html';

app.directive('main', function() {
	return {
		restrict: 'EA',
		template: view,
		bindToController: {},
		controllerAs: 'main',
		controller: function() {
			var calendarFactory = new calendar.Calendar();
			this.renderCalendar = () => {
				this.initMonth = calendarFactory.monthDays(this.date.getFullYear(), this.date.getMonth());
			};
		}
	};
});
