/**
 * Returns the Date object for the nth occurrence of a specific weekday in a given month and year.
 * @param {string} year - The year (e.g. '2026').
 * @param {string} month - The month name (e.g. 'February').
 * @param {string} day - The day of the week (e.g. 'Monday').
 * @param {string} occurrence - The occurrence string ('first', 'second', 'third', 'fourth', 'fifth').
 * @returns {Date} The Date object representing the nth occurrence of the specified weekday.
 * @throws {Error} If the occurrence, year, month, or day is invalid, or if the nth occurrence does not exist in the month.
 * @example
 * getNthDayOfMonth('2026', 'January', 'Friday', 'first');
 * // Returns January 2nd, 2026 (first Friday of January 2026)
 * getNthDayOfMonth('2026', 'January', 'Friday', 'second');
 * // Returns January 9th, 2026 (second Friday of January 2026)
 * getNthDayOfMonth('2026', 'January', 'Friday', 'third');
 * // Returns January 16th, 2026 (third Friday of January 2026)
 * getNthDayOfMonth('2026', 'January', 'Friday', 'fourth');
 * // Returns January 23rd, 2026 (fourth Friday of January 2026)
 * getNthDayOfMonth('2026', 'January', 'Friday', 'fifth');
 * // Returns January 30th, 2026 (fifth Friday of January 2026)
 * getNthDayOfMonth('2026', 'January', 'Friday', 'last');
 * // Returns January 30th, 2026 (last Friday of January 2026)
 * getNthDayOfMonth('2026', 'January', 'Friday', 'sixth');
 * // Throws Error: Invalid occurrence: sixth
 */
export function getNthDayOfMonth(year, month, day, occurrence) {
	// map occurrence string to its corresponding number
	let nth =
		occurrence === 'first' ? 1
		: occurrence === 'second' ? 2
		: occurrence === 'third' ? 3
		: occurrence === 'fourth' ? 4
		: occurrence === 'fifth' ? 5
		: occurrence === 'last' ? 'last'
		: null;
	if (nth === null) {
		throw new Error('Invalid occurrence: ' + occurrence);
	}
	// calculate zero-based index for month and day
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	];
	const days = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	];
	const monthIndex = months.indexOf(month.toLowerCase());
	const dayIndex = days.indexOf(day.toLowerCase());
	// parse year
	const yearInt = +year;
	//validate year, month, and day
	if (isNaN(yearInt) || yearInt < 1) {
		throw new Error('Invalid year: ' + year);
	}
	if (monthIndex === -1) {
		throw new Error('Invalid month: ' + month);
	}
	if (dayIndex === -1) {
		throw new Error('Invalid day: ' + day);
	}
	//get total number of occurrences of specified day in the month
	const firstOfMonth = new Date(Date.UTC(yearInt, monthIndex, 1));
	const firstWeekday = firstOfMonth.getUTCDay();
	const offset = (dayIndex - firstWeekday + 7) % 7;
	const firstOccurrence = 1 + offset;
	const occurrences = [firstOccurrence];
	const daysInMonth = new Date(
		Date.UTC(yearInt, monthIndex + 1, 0),
	).getUTCDate();
	while (occurrences[occurrences.length - 1] + 7 <= daysInMonth) {
		occurrences.push(occurrences[occurrences.length - 1] + 7);
	}
	if (nth === 'last') {
		nth = occurrences.length;
	}
	const dayOfMonth = occurrences[nth - 1];
	if (!dayOfMonth) {
		throw new Error(
			`The ${occurrence} ${day} does not exist in ${month} ${year}`,
		);
	}
	// return date object of the nth occurrence
	return new Date(Date.UTC(yearInt, monthIndex, dayOfMonth));
}

/**
 * Returns a calendar matrix for a given month and year, where each week is an array of day numbers (or null for days outside the month).
 * @param {string} year - The year (e.g. '2026').
 * @param {string} month - The month name (e.g. 'February').
 * @returns {Array<Array<number|null>>} A 2D array representing the calendar for the month, where each inner array is a week and contains day numbers for days in the month or null for padding/days not in month.
 * @throws {Error} If the year or month is invalid.
 * @example
 * getCalendarMatrix('2026', 'January');
 * // Returns [
 * //   [null,null,null,null,1,2,3],
 * //   [4,5,6,7,8,9,10],
 * //   [11,12,13,14,15,16,17],
 * //   [18,19,20,21,22,23,24],
 * //   [25,26,27,28,29,30,31]
 * // ] (January 2026 starts on a Thursday and has 31 days)
 */
export function getCalendarMatrix(year, month) {
	// calculate zero-based index for month
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	];
	const monthIndex = months.indexOf(month.toLowerCase());
	// parse year
	const yearInt = +year;
	// validate year and month
	if (isNaN(yearInt) || yearInt < 1) {
		throw new Error('Invalid year: ' + year);
	}
	if (monthIndex === -1) {
		throw new Error('Invalid month: ' + month);
	}
	// get first day of the month
	const firstOfMonth = new Date(Date.UTC(yearInt, monthIndex, 1));
	const firstWeekday = firstOfMonth.getUTCDay();
	// get number of days in the month by creating a date for the 0th day of the next month (which gives the last day of the current month)
	const daysInMonth = new Date(
		Date.UTC(yearInt, monthIndex + 1, 0),
	).getUTCDate();
	// create calendar matrix
	const calendar = [];
	let week = new Array(7).fill(null);
	let dayCounter = 1;
	// fill in the first week with null until the first day of the month and then start filling in the dates
	for (let i = 0; i < 7; i++) {
		if (i < firstWeekday) {
			week[i] = null;
		} else {
			week[i] = new Date(
				Date.UTC(yearInt, monthIndex, dayCounter),
			).getUTCDate();
			dayCounter++;
		}
	}
	calendar.push(week);
	// fill in the remaining weeks of the month
	while (dayCounter <= daysInMonth) {
		week = new Array(7).fill(null);
		for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
			week[i] = new Date(
				Date.UTC(yearInt, monthIndex, dayCounter),
			).getUTCDate();
			dayCounter++;
		}
		calendar.push(week);
	}
	return calendar;
}

/**
 * Returns previous month's name and year in an object (e.g. { month: "December", year: "2025" }) based on the current month and year.
 * @param {string} currentMonth - The current month  (e.g. 'January').
 * @param {string} currentYear - The current year (e.g. '2026').
 * @returns {object} The previous month and year in the format { month: "Month", year: "Year" }.
 * @example
 * getPreviousMonth('January 2026') would return { month: "December", year: "2025" }.
 * getPreviousMonth('March 2026') would return { month: "February", year: "2026" }.
 */
export function getPreviousMonth(currentMonth, currentYear) {
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	];
	const monthIndex = months.indexOf(currentMonth.toLowerCase());
	let previousMonthIndex = monthIndex - 1;
	let previousYear = +currentYear;
	if (previousMonthIndex < 0) {
		previousMonthIndex = 11;
		previousYear--;
	}
	const month =
		months[previousMonthIndex].charAt(0).toUpperCase() +
		months[previousMonthIndex].slice(1);
	const year = previousYear.toString();
	return { month, year };
}

/**
 * Returns next month's name and year in an object (e.g. { month: "December", year: "2025" }) based on the current month and year.
 * @param {string} currentMonth - The current month  (e.g. 'January').
 * @param {string} currentYear - The current year (e.g. '2026').
 * @returns {object} The next month and year in the format { month: "Month", year: "Year" }.
 * @example
 * getNextMonth('January 2026') would return { month: "February", year: "2026" }.
 * getNextMonth('December 2026') would return { month: "January", year: "2027" }.
 */
export function getNextMonth(currentMonth, currentYear) {
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	];
	const monthIndex = months.indexOf(currentMonth.toLowerCase());
	let nextMonthIndex = monthIndex + 1;
	let nextYear = +currentYear;
	if (nextMonthIndex > 11) {
		nextMonthIndex = 0;
		nextYear++;
	}
	const month =
		months[nextMonthIndex].charAt(0).toUpperCase() +
		months[nextMonthIndex].slice(1);
	const year = nextYear.toString();
	return { month, year };
}

/**
 * Returns events in a month based on the provided month and year, using the supplied daysData array.
 * @param {Array<Object>} daysData - Array of commemorative day objects (from days.json).
 * @param {string} month - The month name (e.g. 'January').
 * @param {string} year - The year (e.g. '2026').
 * @returns {Array<{event: string, date: number}>} An array of event objects in the form { event: "Event Name", date: dayNumber } where date is the day of the month (1-31) that the event occurs.
 * @example
 * getEventsForMonth(daysData, 'October', '2026')
 * //returns [
 * //   { event: 'Ada Lovelace Day', date: 13 },
 * //   { event: 'World Lemur Day', date: 30 }
 * // ]
 * getEventsForMonth(daysData, 'October', '2024')
 * //returns [
 * //   { event: 'Ada Lovelace Day', date: 8 },
 * //   { event: 'World Lemur Day', date: 25 }
 * // ]
 */
export function getEventsForMonth(daysData, month, year) {
	const events = daysData.filter((event) => event.monthName === month);
	const eventDates = events.map((event) => {
		return {
			event: event.name,
			date: getNthDayOfMonth(
				year,
				month,
				event.dayName,
				event.occurrence,
			).getUTCDate(),
		};
	});
	return eventDates;
}
