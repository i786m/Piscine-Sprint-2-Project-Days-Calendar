import { getNthDayOfMonth, getCalendarMatrix } from './common.mjs';
import assert from "node:assert";
import test from "node:test";

test("getNthDayOfMonth returns correct date", () => {
  const result1 = getNthDayOfMonth(2026, "January", "Friday", "first"); // January 1st, 2026 is a Friday (0-indexed weekday)
  assert.equal(result1.getUTCFullYear(), 2026); 
  assert.equal(result1.getUTCMonth(), 0); // January is month 0 in JS
  assert.equal(result1.getUTCDate(), 2); // January 2nd, 2026 is the first Friday 

  const result2 = getNthDayOfMonth(2026, "January", "Friday", "second"); // January 8th, 2026 is the second Friday 
  assert.equal(result2.getUTCFullYear(), 2026);
  assert.equal(result2.getUTCMonth(), 0); // January is month 0 in JS
  assert.equal(result2.getUTCDate(), 9); // January 9th, 2026 is the second Friday

  const result3 = getNthDayOfMonth(2026, "January", "Friday", "third"); // January 15th, 2026 is the third Friday
  assert.equal(result3.getUTCFullYear(), 2026);
  assert.equal(result3.getUTCMonth(), 0); // January is month 0 in JS
  assert.equal(result3.getUTCDate(), 16); // January 16th, 2026 is the third Friday

  const result4 = getNthDayOfMonth(2026, "January", "Friday", "fourth"); // January 22nd, 2026 is the fourth Friday
  assert.equal(result4.getUTCFullYear(), 2026);
  assert.equal(result4.getUTCMonth(), 0); // January is month 0 in JS
  assert.equal(result4.getUTCDate(), 23); // January 23rd, 2026 is the fourth Friday

  const result5 = getNthDayOfMonth(2026, "January", "Friday", "fifth"); // January 29th, 2026 is the fifth Friday    
  assert.equal(result5.getUTCFullYear(), 2026);
  assert.equal(result5.getUTCMonth(), 0); // January is month 0 in JS
  assert.equal(result5.getUTCDate(), 30); // January 30th, 2026 is the fifth Friday

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