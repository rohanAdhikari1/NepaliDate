import {
  localenumber,
  localeShortMonth,
  localeMonth,
  localeShortday,
  localeday,
} from "../src/locale";

import {
  MONTHS_SHORT_EN,
  MONTHS_SHORT_NP,
  MONTHS_NP,
  MONTHS_EN,
  WEEKDAYS_SHORT_EN,
  WEEKDAYS_SHORT_NP,
  WEEKDAYS_LONG_EN,
  WEEKDAYS_LONG_NP,
} from "../src/constant";

describe("Utilities - Localization", () => {
  describe("localenumber()", () => {
    it("returns English number string when locale is 'en'", () => {
      expect(localenumber(123, "en")).toBe("123");
      expect(localenumber("456", "en")).toBe("456");
    });

    it("calls convertToUnicode and returns Nepali number string when locale is 'np'", () => {
      expect(localenumber(789, "np")).toBe("७८९");
      expect(localenumber("1011", "np")).toBe("१०११");
      expect(localenumber("1011-excepthis", "np")).toBe("१०११-excepthis");
    });
  });

  describe("localeShortMonth()", () => {
    it("returns correct short month in English", () => {
      MONTHS_SHORT_EN.forEach((m, i) => {
        expect(localeShortMonth(i + 1, "en")).toBe(m);
      });
    });

    it("returns correct short month in Nepali", () => {
      MONTHS_SHORT_NP.forEach((m, i) => {
        expect(localeShortMonth(i + 1, "np")).toBe(m);
      });
    });

    it("wraps numbers >12 or <1 correctly", () => {
      expect(localeShortMonth(13, "en")).toBe(MONTHS_SHORT_EN[0]);
      expect(localeShortMonth(0, "np")).toBe(MONTHS_SHORT_NP[11]);
    });
  });

  describe("localeMonth()", () => {
    it("returns full month in English", () => {
      MONTHS_EN.forEach((m, i) => {
        expect(localeMonth(i + 1, "en")).toBe(m);
      });
    });

    it("returns full month in Nepali", () => {
      MONTHS_NP.forEach((m, i) => {
        expect(localeMonth(i + 1, "np")).toBe(m);
      });
    });

    it("wraps numbers correctly", () => {
      expect(localeMonth(14, "en")).toBe(MONTHS_EN[1]);
      expect(localeMonth(-1, "np")).toBe(MONTHS_NP[10]);
    });
  });

  describe("localeShortday()", () => {
    it("returns correct short weekday in English", () => {
      WEEKDAYS_SHORT_EN.forEach((d, i) => {
        expect(localeShortday(i + 1, "en")).toBe(d);
      });
    });

    it("returns correct short weekday in Nepali", () => {
      WEEKDAYS_SHORT_NP.forEach((d, i) => {
        expect(localeShortday(i + 1, "np")).toBe(d);
      });
    });

    it("wraps negative numbers correctly", () => {
      expect(localeShortday(-1, "en")).toBe(WEEKDAYS_SHORT_EN[5]);
    });
  });

  describe("localeday()", () => {
    it("returns full weekday in English", () => {
      WEEKDAYS_LONG_EN.forEach((d, i) => {
        expect(localeday(i + 1, "en")).toBe(d);
      });
    });

    it("returns full weekday in Nepali", () => {
      WEEKDAYS_LONG_NP.forEach((d, i) => {
        expect(localeday(i + 1, "np")).toBe(d);
      });
    });

    it("wraps negative numbers correctly", () => {
      expect(localeday(-2, "np")).toBe(WEEKDAYS_LONG_NP[4]);
    });
  });
});
