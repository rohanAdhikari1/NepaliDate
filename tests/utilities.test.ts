import { LEAP_MONTHS, NORMAL_MONTHS } from "../src/constant";
import NepaliDate from "../src/NepaliDate";
import {
  getDaysInBSMonth,
  getDaysInADMonth,
  sumArray,
  isLeapYear,
  convertToDigit,
  calculateDayofWeek,
  compareDates,
} from "../src/utilities";

describe("Date Utilities", () => {
  describe("sumArray()", () => {
    it("sums an array of numbers", () => {
      expect(sumArray([1, 2, 3, 4])).toBe(10);
      expect(sumArray([])).toBe(0);
    });
  });

  describe("isLeapYear()", () => {
    it("detects leap years correctly", () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2004)).toBe(true);
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2001)).toBe(false);
    });
  });

  describe("convertToDigit()", () => {
    it("converts Nepali unicode digits back to English", () => {
      const nepaliNum = "१२३";
      expect(convertToDigit(nepaliNum)).toBe("123");
    });
  });

  describe("getDaysInBSMonth()", () => {
    it("returns currect number of days for a month", () => {
      expect(getDaysInBSMonth(2082, 6)).toBe(31);
      expect(getDaysInBSMonth(2082, 12)).toBe(30);
      expect(getDaysInBSMonth(2070, 9)).toBe(30);
      expect(getDaysInBSMonth(2076, 1)).toBe(31);
      expect(getDaysInBSMonth(2085, 8)).toBe(30);
      expect(getDaysInBSMonth(2087, 11)).toBe(30);
      expect(getDaysInBSMonth(2005, 12)).toBe(30);
    });
  });

  describe("getDaysInADMonth()", () => {
    it("returns correct days for English month", () => {
      expect(getDaysInADMonth(2020, 2)).toBe(LEAP_MONTHS[1]); // leap year
      expect(getDaysInADMonth(2021, 2)).toBe(NORMAL_MONTHS[1]); // non-leap
    });
  });

  describe("calculateDayofWeek()", () => {
    it("calculates correct weekday", () => {
      const dayOfWeek = calculateDayofWeek(2070, 1, 1);
      expect(dayOfWeek).toBe(1);
      const dayOfWeek2 = calculateDayofWeek(2061, 12, 15);
      expect(dayOfWeek2).toBe(2);
      const dayOfWeek3 = calculateDayofWeek(2078, 3, 1);
      expect(dayOfWeek3).toBe(3);
      const dayOfWeek4 = calculateDayofWeek(2080, 4, 3);
      expect(dayOfWeek4).toBe(4);
      const dayOfWeek5 = calculateDayofWeek(2082, 6, 17);
      expect(dayOfWeek5).toBe(6);
    });
  });

  describe("compareDates()", () => {
    const d1 = new NepaliDate({ year: 2078, month: 1, day: 1 });
    const d2 = new NepaliDate({ year: 2078, month: 1, day: 2 });

    it("returns -1 if date1 < date2", () => {
      expect(compareDates(d1, d2)).toBe(-1);
    });

    it("returns 1 if date1 > date2", () => {
      expect(compareDates(d2, d1)).toBe(1);
    });

    it("returns 0 if dates are equal", () => {
      expect(compareDates(d1, d1)).toBe(0);
    });

    it("considers hour and minute if withTime=true", () => {
      const d3 = new NepaliDate({ ...d1.toObject(), hour: 5, minute: 0 });
      const d4 = new NepaliDate({ ...d1.toObject(), hour: 6, minute: 0 });
      expect(compareDates(d3, d4, true)).toBe(-1);
    });
  });
});
