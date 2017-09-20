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

			var getRemaingMonths = () => {
				var counter = 0;
				var initMonth = this.date.getMonth();
				var initYear = this.date.getFullYear();
				angular.forEach(this.initMonth, (week) => {
					angular.forEach(week, (day) => {
						if (day >= this.date.getDate()) {
							counter++;
						}
					});
				});
				
				while(counter != this.number) {
					this.remaingMonths = [];
					if (initMonth == 11) {
						initMonth = 0;
						initYear++;
					} else {
						initMonth++;
					}

					var nextMonth = calendarFactory.monthDays(initMonth, initYear);
					this.remaingMonths.append(nextMonth);
					angular.forEach(nextMonth, (week) => {
						angular.forEach(week, (day) => {
							if (day >= this.date.getDate()) {
								counter++;
							}
						});
					});
				}
			};

			this.renderCalendar = () => {
				this.initMonth = calendarFactory.monthDays(this.date.getFullYear(), this.date.getMonth());
				getRemaingMonths();
			};
		}
	};
});
