import {
	getCalendarMatrix,
	getEventsForMonth,
	getPreviousMonth,
	getNextMonth,
} from './common.mjs';

let daysData = [];

fetch('./days.json')
	.then((response) => response.json())
	.then((data) => {
		daysData = data;
		renderCalendar();
	});

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
let currentMonth = new Date().getMonth();
const monthDropdown = () => {
	const monthSelect = document.getElementById('month');
	monthSelect.innerHTML = '';
	MONTHS.forEach((monthName, index) => {
		const option = document.createElement('option');
		option.textContent = monthName;
		option.value = index;
		monthSelect.appendChild(option);
	});
	monthSelect.value = currentMonth;
};
monthDropdown();
document.getElementById('month').addEventListener('change', (e) => {
	currentMonth = Number(e.target.value);
	renderCalendar();
});

let currentYear = new Date().getFullYear(); // get month get year and populate to span in controls div
const yearDropdown = () => {
	const selectYear = document.getElementById('year');
	selectYear.innerHTML = '';
	for (let i = 1900; i <= 2100; i++) {
		const option = document.createElement('option');
		option.textContent = i;
		option.value = i;
		selectYear.appendChild(option);
	}
	selectYear.value = currentYear;
};

yearDropdown();
document.getElementById('year').addEventListener('change', (e) => {
	currentYear = Number(e.target.value);
	renderCalendar();
});

const renderCalendar = () => {
	const calendarGrid = document.getElementById('calendarGrid');
	calendarGrid.innerHTML = '';

	const monthName = MONTHS[currentMonth];
	const yearString = String(currentYear);

	const displayMonth = document.getElementById('current-month');
	displayMonth.textContent = monthName

	const displayYear = document.getElementById('current-year');
	displayYear.textContent = yearString;


	const matrix = getCalendarMatrix(yearString, monthName);
	// Get events for this month/year
	const events = getEventsForMonth(daysData, monthName, yearString);

	matrix.forEach((week) => {
		week.forEach((day) => {
			const cell = document.createElement('div');
			cell.classList.add('dayCell');

			if (day !== null) {
				cell.textContent = day;
				cell.setAttribute('data-day', day);
			}

			calendarGrid.appendChild(cell);
		});
	});

	// After rendering, append events to the correct cells
	events.forEach((ev) => {
		const cell = calendarGrid.querySelector(`[data-day="${ev.date}"]`);
		if (cell) {
			const eventDiv = document.createElement('div');
			eventDiv.textContent = ev.event;
			eventDiv.className = 'eventName';
			cell.appendChild(eventDiv);
		}
	});
};
document.getElementById('prevBtn').addEventListener('click', () => {
	const { month, year } = getPreviousMonth(MONTHS[currentMonth], currentYear);

	currentMonth = MONTHS.indexOf(month);
	currentYear = Number(year);

	ensureYearInDropdown(currentYear);

	document.getElementById('month').value = currentMonth;
	document.getElementById('year').value = currentYear;

	renderCalendar();
});


document.getElementById('nextBtn').addEventListener('click', () => {
	const { month, year } = getNextMonth(MONTHS[currentMonth], currentYear);

	currentMonth = MONTHS.indexOf(month);
	currentYear = Number(year);

	ensureYearInDropdown(currentYear);

	document.getElementById('month').value = currentMonth;
	document.getElementById('year').value = currentYear;

	renderCalendar();
});



function ensureYearInDropdown(year) {
	const yearSelect = document.getElementById('year');
	let yearExists = false;

	for (let i = 0; i < yearSelect.options.length; i++) {
		if (Number(yearSelect.options[i].value) === year) {
			yearExists = true;
			break;
		}
	}

	if (!yearExists) {
		const option = document.createElement('option');
		option.value = year;
		option.textContent = year;
		yearSelect.appendChild(option);
	}
}
