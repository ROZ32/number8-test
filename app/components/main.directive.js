import calendar from 'calendar';

import app from '../app';
import view from '../views/main.html';

app.directive('main', function() {
	return {
		restrict: 'EA',
		template: view,
		bindToController: {},
		controllerAs: 'main',
		controller: function($http) {
			this.monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"];
			var calendarFactory = new calendar.Calendar();

			var getRemainingMonths = () => {
				this.remainingMonths = [];
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
				
				while(counter < this.number) {
					if (initMonth == 11) {
						initMonth = 0;
						initYear++;
					} else {
						initMonth++;
					}

					var nextMonth = calendarFactory.monthDays(initYear, initMonth);
					this.remainingMonths.push(nextMonth);
					angular.forEach(nextMonth, (week) => {
						angular.forEach(week, (day) => {
							if (day > 0) {
								counter++;
								console.log(counter);
							}
						});
					});
				}
			};

			this.renderCalendar = () => {
				this.initMonth = calendarFactory.monthDays(this.date.getFullYear(), this.date.getMonth());
				this.initMonthYear = this.monthNames[this.date.getMonth()] + ' ' + this.date.getFullYear();
				getRemainingMonths();
			};

			this.getHolidays = (contryCode) => {
				$http.get(
					'https://holidayapi.com/v1/holidays?key=b5ab6956-fdd1-43ad-9a05-2bbb19e1a752&country=US&year=2008'
				).then((result) => {
					this.holidays = result.data.holidays;
				}).catch((error) => {
					this.error = error;
				});
			};
			this.getHolidays();
		}
	};
});
