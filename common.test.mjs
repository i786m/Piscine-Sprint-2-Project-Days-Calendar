import { getNthDayOfMonth, getCalendarMatrix, getPreviousMonth, getNextMonth, getEventsForMonth } from './common.mjs';
import assert from "node:assert";
import test from "node:test";
import daysData from './days.json' with { type: 'json' };

test("getNthDayOfMonth returns correct date", () => {
  const result1 = getNthDayOfMonth(2026, "January", "Friday", "first");
  assert.equal(result1.getUTCFullYear(), 2026);
  assert.equal(result1.getUTCMonth(), 0);
  assert.equal(result1.getUTCDate(), 2);

  const result2 = getNthDayOfMonth(2026, "January", "Friday", "second");
  assert.equal(result2.getUTCFullYear(), 2026);
  assert.equal(result2.getUTCMonth(), 0);
  assert.equal(result2.getUTCDate(), 9);

  const result3 = getNthDayOfMonth(2026, "January", "Friday", "third");
  assert.equal(result3.getUTCFullYear(), 2026);
  assert.equal(result3.getUTCMonth(), 0);
  assert.equal(result3.getUTCDate(), 16);

  const result4 = getNthDayOfMonth(2026, "January", "Friday", "fourth");
  assert.equal(result4.getUTCFullYear(), 2026);
  assert.equal(result4.getUTCMonth(), 0);
  assert.equal(result4.getUTCDate(), 23);

  const result5 = getNthDayOfMonth(2026, "January", "Friday", "fifth");
  assert.equal(result5.getUTCFullYear(), 2026);
  assert.equal(result5.getUTCMonth(), 0);
  assert.equal(result5.getUTCDate(), 30);

  assert.throws(() => getNthDayOfMonth(2026, "January", "Friday", "sixth"), /Invalid occurrence/);
});

test("getCalendarMatrix returns correct calendar matrix", () => {
  const result = getCalendarMatrix("2026", "January");
  assert.equal(result.length, 5);
  assert.equal(result[0].length, 7);
  assert.deepEqual(result[0], [null, null, null, null, 1, 2, 3]);
  assert.deepEqual(result[1], [4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(result[2], [11, 12, 13, 14, 15, 16, 17]);
  assert.deepEqual(result[3], [18, 19, 20, 21, 22, 23, 24]);
  assert.deepEqual(result[4], [25, 26, 27, 28, 29, 30, 31]);
});

test("getCalendarMatrix works for February in a leap year", () => {
  const result = getCalendarMatrix("2024", "February");
  assert.equal(result.length, 5);
  assert.deepEqual(result[0], [null, null, null, null, 1, 2, 3]);
  assert.deepEqual(result[1], [4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(result[2], [11, 12, 13, 14, 15, 16, 17]);
  assert.deepEqual(result[3], [18, 19, 20, 21, 22, 23, 24]);
  assert.deepEqual(result[4], [25, 26, 27, 28, 29, null, null]);
});

test("getPreviousMonth returns correct previous month and year", () => {
  assert.deepEqual(getPreviousMonth("January", "2026"), { year: "2025", month: "December" });
  assert.deepEqual(getPreviousMonth("February", "2026"), { year: "2026", month: "January" });
  assert.deepEqual(getPreviousMonth("December", "2026"), { year: "2026", month: "November" });
  assert.deepEqual(getPreviousMonth("January", "2020"), { year: "2019", month: "December" });
  assert.deepEqual(getPreviousMonth('January', '1901'), {
    year: '1900',
    month: 'December',
  });
});

test("getNextMonth returns correct next month and year", () => {
  assert.deepEqual(getNextMonth("January", "2026"), { year: "2026", month: "February" });
  assert.deepEqual(getNextMonth("February", "2026"), { year: "2026", month: "March" });
  assert.deepEqual(getNextMonth("December", "2026"), { year: "2027", month: "January" });
  assert.deepEqual(getNextMonth("January", "2019"), { year: "2019", month: "February" });
  assert.deepEqual(getNextMonth('December', '1901'), {
    year: '1902', month: 'January',
  });
});

test("getEventsForMonth returns correct events for a given month and year", () => {
  const eventsOctober2026 = getEventsForMonth(daysData, "October", "2026");
  assert.deepEqual(eventsOctober2026, [
    { event: "Ada Lovelace Day", date: 13 },
    { event: "World Lemur Day", date: 30 },
  ]);

  const eventsOctober2024 = getEventsForMonth(daysData, "October", "2024");
  assert.deepEqual(eventsOctober2024, [
    { event: "Ada Lovelace Day", date: 8 },
    { event: "World Lemur Day", date: 25 },
  ]);

  const eventsSeptember2026 = getEventsForMonth(daysData, "September", "2026");
  assert.deepEqual(eventsSeptember2026, [
    { event: 'International Vulture Awareness Day', date: 5 },
    { event: 'International Red Panda Day', date: 19 },
  ]);

  const eventsMay2026 = getEventsForMonth(daysData, "May", "2026");
  assert.deepEqual(eventsMay2026, [
    { event: 'International Binturong Day', date: 9 },
  ]);
});