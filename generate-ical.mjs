import fs from 'fs';
import { getNthDayOfMonth } from './common.mjs';

const daysData = JSON.parse(
	fs.readFileSync(new URL('./days.json', import.meta.url)),
);

let text = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Days Calendar//EN\n';

for (let year = 2020; year <= 2030; year++) {
	for (const { name, monthName, dayName, occurrence } of daysData) {
		const date = getNthDayOfMonth(year, monthName, dayName, occurrence);
		const endDate = new Date(date);
		endDate.setDate(endDate.getDate() + 1);
		const event = {
			name,
			start: date.toISOString().split('T')[0].replace(/-/g, ''),
			end: endDate.toISOString().split('T')[0].replace(/-/g, ''),
		};

		text += 'BEGIN:VEVENT\n';
		text += `UID:${event.name}-${event.start}@days-calendar\n`;
		text += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
		text += `SUMMARY:${event.name}\n`;
		text += `DTSTART;VALUE=DATE:${event.start}\n`;
		text += `DTEND;VALUE=DATE:${event.end}\n`;
		text += 'END:VEVENT\n';
	}
}

text += 'END:VCALENDAR\n';

fs.writeFileSync('days.ics', text);
console.log('days.ics generated!');
