import { LEAP_MONTHS, NORMAL_MONTHS } from "../src/constant";
import {
  getDaysInBSMonth,
  getDaysInADMonth,
  sumArray,
  isLeapYear,
  convertToDigit,
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

  //TODO: make test suitable 

//   describe("getTotalADDays()", () => {
//     it("calculates total days from BASE_YEAR_AD to given AD date", () => {
//       const days = getTotalADDays(BASE_YEAR_AD, 1, 1);
//       expect(days).toBe(1);
//       const nextYear = getTotalADDays(BASE_YEAR_AD + 1, 1, 1);
//       expect(nextYear).toBe(sumArray(isLeapYear(BASE_YEAR_AD) ? LEAP_MONTHS : NORMAL_MONTHS) + 1);
//     });
//   });

//   describe("getTotalBSDays()", () => {
//     it("calculates total BS days from BASE_YEAR_BS", () => {
//       const days = getTotalBSDays(BASE_YEAR_BS, 1, 1);
//       expect(days).toBe(1);
//       const nextMonth = getTotalBSDays(BASE_YEAR_BS, 2, 1);
//       expect(nextMonth).toBe(1 + NEPALI_DATE_MAP[0][1]);
//     });
//   });

//   describe("calculateDayofWeek()", () => {
//     it("calculates correct weekday", () => {
//       const dayOfWeek = calculateDayofWeek(BASE_YEAR_BS, 1, 1);
//       expect(dayOfWeek).toBe(((START_WEEK_DAY_BS + 1 - 1) % 7) + 1); // first day
//     });
//   });

//   describe("compareDates()", () => {
//     const d1: Partial<NepaliDate> = { year: 2078, month: 1, day: 1 };
//     const d2: Partial<NepaliDate> = { year: 2078, month: 1, day: 2 };

//     it("returns -1 if date1 < date2", () => {
//       expect(compareDates(d1 as NepaliDate, d2 as NepaliDate)).toBe(-1);
//     });

//     it("returns 1 if date1 > date2", () => {
//       expect(compareDates(d2 as NepaliDate, d1 as NepaliDate)).toBe(1);
//     });

//     it("returns 0 if dates are equal", () => {
//       expect(compareDates(d1 as NepaliDate, d1 as NepaliDate)).toBe(0);
//     });

//     it("considers hour and minute if withTime=true", () => {
//       const d3: any = { ...d1, hour: 5, minute: 0 };
//       const d4: any = { ...d1, hour: 6, minute: 0 };
//       expect(compareDates(d3 as NepaliDate, d4 as NepaliDate, true)).toBe(-1);
//     });
//   });
});
