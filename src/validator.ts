import { BASE_YEAR_AD, BASE_YEAR_BS, NEPALI_DATE_MAP } from "./constant";
import { getDaysInBSMonth, getDaysInADMonth } from "./utilities";

export const validateHour = (hour: number): boolean => {
  if (hour > 24 && hour < 0) {
    return false;
  }
  return true;
};

export const validateMinuteSecond = (value: number): boolean => {
  if (value < 0 || value > 59) return false;
  return true;
};

export const validateBsYear = (year: number) => {
  if (
    year < BASE_YEAR_BS ||
    year > BASE_YEAR_BS + NEPALI_DATE_MAP.length - 1
  ) {
    return false;
  }
  return true;
};

export const validateMonth = (month: number): boolean => {
  if (month < 1 || month > 12) {
    return false;
  }
  return true;
};

export const validateBsDay = (
  year: number,
  month: number,
  day: number
): boolean => {
  const maxDays = getDaysInBSMonth(year, month);
  if (day < 1 || day > maxDays) {
    return false;
  }
  return true;
};

export const validateAD = (year: number, month: number, day: number) => {
  if (
    year < BASE_YEAR_AD ||
    year > BASE_YEAR_AD + NEPALI_DATE_MAP.length - 1
  ) {
    throw new Error(
      `Supported AD years: ${BASE_YEAR_AD}-${
        BASE_YEAR_AD + NEPALI_DATE_MAP.length - 1
      }`
    );
  }

  if (!validateMonth(month)) {
    throw new Error(`Invalid month ${month}. Supported months: 1-12`);
  }

  const maxDays = getDaysInADMonth(year, month);
  if (day < 1 || day > maxDays) {
    throw new Error(`Invalid day ${day} for month ${month} in year ${year}`);
  }
};

export const validateBS = (year: number, month: number, day: number) => {
  if (!validateBsYear(year)) {
    throw new Error(
      `Supported BS years: ${BASE_YEAR_BS}-${
        BASE_YEAR_BS + NEPALI_DATE_MAP.length - 1
      }`
    );
  }
  if (!validateMonth(month)) {
    throw new Error(`Invalid month ${month}. Supported months: 1-12`);
  }
  if (!validateBsDay(year, month, day)) {
    throw new Error(`Invalid day ${day} for month ${month} in year ${year}`);
  }
};
