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
				console.log(this.holidays);
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
					this.remainingMonths.push({
						year: initYear,
						month: initMonth,
						weeks: nextMonth
					});
					angular.forEach(nextMonth, (week) => {
						angular.forEach(week, (day) => {
							if (day > 0) {
								counter++;
								if (counter == this.number) {
									this.lastDay = day;
									this.lastMonth = initMonth;
									this.lastYear = initYear;
								}
							}
						});
					});
				}
			};

			this.checkIfDateHasHoliday = (year, month, day) => {
				var dateInFormat;
				if (this.holidays && day != 0) {				
					if (!year || !month) {
						dateInFormat = `${this.date.getFullYear()}-${('0' + (this.date.getMonth() + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
					} else {
						dateInFormat = `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
					}

					if (this.holidays.hasOwnProperty(dateInFormat)) {
						return this.holidays[dateInFormat];
					}
				}
				return null;
			};

			this.renderCalendar = () => {
				this.error = '';
				if (!this.date || !this.number || !this.code) {
					this.error = 'Please fill in all the fields!!!';
					delete this.initMonth;
					delete this.initMonthYear;
					return;
				}

				if (new Date(this.date) == 'Invalid Date') {
					this.error = 'Not valid Date!!!';
					delete this.initMonth;
					delete this.initMonthYear;
					return;
				}

				this.initMonth = calendarFactory.monthDays(this.date.getFullYear(), this.date.getMonth());
				this.initMonthYear = this.monthNames[this.date.getMonth()] + ' ' + this.date.getFullYear();
				if (this.date.getFullYear() == 2008) {
					getHolidays(this.code, getRemainingMonths);
				} else {
					getRemainingMonths();
				}
			};

			var getHolidays = (contryCode, callback) => {
				$http.get(
					'https://holidayapi.com/v1/holidays?key=b5ab6956-fdd1-43ad-9a05-2bbb19e1a752&country=' + contryCode + '&year=2008'
				).then((result) => {
					this.holidays = result.data.holidays;
					if (callback) callback();
				}).catch((error) => {
					delete this.initMonth;
					delete this.initMonthYear;
					delete this.remainingMonths;
					this.error = 'Error trying to get the holidays';
				});
			};
		}
	};
});
