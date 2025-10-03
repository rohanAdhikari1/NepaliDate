import nepalidayjs, { NepaliDate } from "../src";
import {
  BASE_YEAR_BS,
  WEEKDAYS_SHORT_EN,
  WEEKDAYS_SHORT_NP,
  WEEKDAYS_LONG_EN,
  WEEKDAYS_LONG_NP,
  MONTHS_EN,
  MONTHS_NP,
  MONTHS_SHORT_EN,
  MONTHS_SHORT_NP,
} from "../src/constant";

describe("nepalidayjs core functionality", () => {
  it("should return a current NepaliDate when initialized with no args", () => {
    const d = nepalidayjs();
    expect(d).toBeInstanceOf(NepaliDate);
    expect(d.year()).toBe(2082);
  });

  it("should accept a NepaliDate instance directly", () => {
    const d = new NepaliDate({ year: 2082, month: 6, day: 15 });
    const result = nepalidayjs(d);
    expect(result).toBe(d);
  });

  it("should create NepaliDate from Date", () => {
    const ad = new Date("2020-01-01");
    const nd = nepalidayjs.fromAd(ad);
    expect(nd).toBeInstanceOf(NepaliDate);
    expect(nd.year()).toBe(2076);
  });

  it("should create NepaliDate from ISO string", () => {
    const nd = nepalidayjs.fromAd("2020-01-01");
    expect(nd).toBeInstanceOf(NepaliDate);
     expect(nd.year()).toBe(2076);
  });

  it("should throw for invalid inputs", () => {
    // @ts-expect-error testing invalid case
    expect(() => nepalidayjs(123)).toThrow("Unsupported date");
  });

  it("should throw for invalid date string", () => {
    expect(() => nepalidayjs("not-a-date")).toThrow("Invalid Date String");
  });
});

describe("Locale functions", () => {
  it("should return weekdays in EN", () => {
    expect(nepalidayjs.weekdays()).toEqual(WEEKDAYS_LONG_EN);
    expect(nepalidayjs.weekdaysShort()).toEqual(WEEKDAYS_SHORT_EN);
  });

  it("should return weekdays in NP", () => {
    expect(nepalidayjs.weekdays("np")).toEqual(WEEKDAYS_LONG_NP);
    expect(nepalidayjs.weekdaysShort("np")).toEqual(WEEKDAYS_SHORT_NP);
  });

  it("should return months in EN and NP", () => {
    expect(nepalidayjs.months()).toEqual(MONTHS_EN);
    expect(nepalidayjs.months("np")).toEqual(MONTHS_NP);
    expect(nepalidayjs.monthsShort()).toEqual(MONTHS_SHORT_EN);
    expect(nepalidayjs.monthsShort("np")).toEqual(MONTHS_SHORT_NP);
  });
});

describe("Min/Max boundaries", () => {
  it("should return minDate with valid year", () => {
    const min = nepalidayjs.minDate();
    expect(min.year()).toBe(BASE_YEAR_BS);
  });

  it("should return maxDate with valid year", () => {
    const max = nepalidayjs.maxDate();
    expect(max.year()).toBe(nepalidayjs.maxYear());
  });

  it("should return minYear and maxYear", () => {
    expect(nepalidayjs.minYear()).toBe(BASE_YEAR_BS);
    expect(nepalidayjs.maxYear()).toBeGreaterThan(BASE_YEAR_BS);
  });
});

describe("Validation", () => {
  it("should call .isValid() on a NepaliDate", () => {
    const d = new NepaliDate({ year: 2082, month: 6, day: 17 });
    expect(nepalidayjs.isValid(d)).toBe(true);
  });

  it("should throw for string validation (not supported yet)", () => {
    expect(() => nepalidayjs.isValid("2020-01-01")).toThrow(
      "Feature Not Available in current version"
    );
  });
});
