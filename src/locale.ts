import { convertToUnicode } from "./utilities";
import {
  MONTHS_SHORT_EN,
  MONTHS_SHORT_NP,
  MONTHS_NP,
  MONTHS_EN,
  WEEKDAYS_SHORT_EN,
  WEEKDAYS_SHORT_NP,
  WEEKDAYS_LONG_EN,
  WEEKDAYS_LONG_NP,
} from "./constant";
import type { Locale } from "./types";

/**
 * Convert a number (string or number) into localized format.
 */
export const localenumber = (num: string | number, locale: Locale): string => {
  const str = String(num);
  return locale === "np" ? convertToUnicode(str) : str;
};

/**
 * Return short month name.
 */
export const localeShortMonth = (num: number, locale: Locale): string => {
  const index = (num - 1 + 12) % 12;
  return locale === "np" ? MONTHS_SHORT_NP[index]! : MONTHS_SHORT_EN[index]!;
};

/**
 * Return full month name.
 */
export const localeMonth = (num: number, locale: Locale): string => {
  const index = (num - 1 + 12) % 12;
  return locale === "np" ? MONTHS_NP[index]! : MONTHS_EN[index]!;
};

/**
 * Return short weekday name.
 */
export const localeShortday = (num: number, locale: Locale): string => {
  const index = (num + 7) % 7;
  return locale === "np"
    ? WEEKDAYS_SHORT_NP[index]!
    : WEEKDAYS_SHORT_EN[index]!;
};

/**
 * Return full weekday name.
 */
export const localeday = (num: number, locale: Locale): string => {
  const index = (num + 7) % 7;
  return locale === "np" ? WEEKDAYS_LONG_NP[index]! : WEEKDAYS_LONG_EN[index]!;
};
