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
 * getNthDayOfMonth('2026', 'January', 'Friday', 'sixth');
 * // Throws Error: Invalid occurrence: sixth
 */
export function getNthDayOfMonth(year, month, day, occurrence) {
	// map occurrence string to its corresponding number
	const nth =
		occurrence === 'first' ? 1
		: occurrence === 'second' ? 2
		: occurrence === 'third' ? 3
		: occurrence === 'fourth' ? 4
		: occurrence === 'fifth' ? 5
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

	// get first day of the month
	const firstOfMonth = new Date(Date.UTC(yearInt, monthIndex, 1));
	// get the first day index
	const firstWeekday = firstOfMonth.getUTCDay();
	// find offset to first occurrence of the desired day
	const offset = (dayIndex - firstWeekday + 7) % 7;
	// calculate day of the month for the nth occurrence
	const dayOfMonth = 1 + offset + (nth - 1) * 7;
	// validate that the calculated day of the month exists
	const daysInMonth = 
        new Date(Date.UTC(yearInt, monthIndex + 1, 0),).getUTCDate();
	if (dayOfMonth > daysInMonth) {
		throw new Error(
			`There is no ${occurrence} ${day} in ${month} ${year}`,
		);
	}
	// return date object of the nth occurrence
	return new Date(Date.UTC(yearInt, monthIndex, dayOfMonth));
}
