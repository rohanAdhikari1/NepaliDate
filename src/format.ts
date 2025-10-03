import {
  localenumber,
  localeShortMonth,
  localeMonth,
  localeShortday,
  localeday,
} from "./locale";

import type { Locale, NepaliDateObj } from "./types";

export default function format(
  dateobj: NepaliDateObj,
  stringFormat: string,
  locale: Locale = "en",
): string {
  const pad = (num: number | string, size = 2): string =>
    String(num).padStart(size, "0");

  const to12Hour = (hour: number): number => hour % 12 || 12;

  return stringFormat
    .replace(
      /((\\[MDYdHhmsa])|D{1,2}|M{1,4}|Y{2,4}|d{1,3}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|A)/g,
      (match, _, matchedString) => {
        switch (match) {
          // Day
          case "D":
            return localenumber(dateobj.day.toString(), locale);
          case "DD":
            return localenumber(pad(dateobj.day), locale);

          // Month
          case "M":
            return localenumber(dateobj.month.toString(), locale);
          case "MM":
            return localenumber(pad(dateobj.month), locale);
          case "MMM":
            return localeShortMonth(dateobj.month, locale);
          case "MMMM":
            return localeMonth(dateobj.month, locale);

          // Year
          case "YY":
            return localenumber(dateobj.year.toString().slice(-2), locale);
          case "YYY":
            return localenumber(dateobj.year.toString().slice(-3), locale);
          case "YYYY":
            return localenumber(dateobj.year.toString(), locale);

          // Weekday
          case "d":
            return localenumber(dateobj.dayOfWeek.toString(), locale);
          case "dd":
            return localeShortday(dateobj.dayOfWeek, locale);
          case "ddd":
            return localeday(dateobj.dayOfWeek, locale);

          // Time
          case "H":
          case "HH":
            return localenumber(pad(dateobj.hour || 0), locale);
          case "h":
          case "hh":
            return localenumber(pad(to12Hour(dateobj.hour || 0)), locale);
          case "m":
          case "mm":
            return localenumber(pad(dateobj.minute || 0), locale);
          case "s":
          case "ss":
            return localenumber(pad(dateobj.second || 0), locale);
          case "A":
            return (dateobj.hour || 0) < 12 ? "AM" : "PM";

          default:
            return matchedString.replace("/", "");
        }
      },
    )
    .replace(/\\/g, "");
}
