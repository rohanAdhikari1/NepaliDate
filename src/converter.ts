import {
  START_YEAR_AD,
  START_YEAR_BS,
  START_MONTH_BS,
  START_WEEK_DAY_AD,
  START_WEEK_DAY_BS,
  NEPALI_DATE_MAP,
  START_DAY_BS,
  START_MONTH_AD,
  START_DAY_AD,
  BASE_YEAR_BS,
} from "./constant";

import {
  getDaysInBSMonth,
  sumArray,
  getDaysInADMonth,
  getTotalADDays,
  getTotalBSDays,
} from "./utilities";

import { validateBS,validateAD } from "./validator";


// Conversion Functions
export const ADtoBS = (year: number, month: number, day: number) : [number, number, number, number]=> {
  validateAD(year, month, day);

  let totalAdDays = getTotalADDays(year, month, day);
  let bsYear = START_YEAR_BS,
    bsMonth = START_MONTH_BS,
    bsDay = START_DAY_BS - 1,
    dayOfWeek = START_WEEK_DAY_BS;

  let i = 0,
    j = bsMonth;
  while (totalAdDays > 0) {
    let daysInMonth = NEPALI_DATE_MAP[i]?.[j] ?? 0;
    bsDay++;
    dayOfWeek = (dayOfWeek % 7) + 1;

    if (bsDay > daysInMonth) {
      bsMonth++;
      bsDay = 1;
      j++;
    }

    if (bsMonth > 12) {
      bsYear++;
      bsMonth = 1;
    }

    if (j > 12) {
      j = 1;
      i++;
    }

    totalAdDays--;
  }
  return [bsYear, bsMonth, bsDay, dayOfWeek];
};

export const BStoAD = (year: number, month: number, day: number): [number, number, number, number] => {
  validateBS(year, month, day);

  let totalBsDays = getTotalBSDays(year, month, day);
  let adYear = START_YEAR_AD,
    adMonth = START_MONTH_AD,
    adDay = START_DAY_AD - 1,
    dayOfWeek = START_WEEK_DAY_AD;

  while (totalBsDays > 0) {
    const daysInMonth = getDaysInADMonth(adYear, adMonth);
    adDay++;
    dayOfWeek = (dayOfWeek % 7) + 1;

    if (adDay > daysInMonth) {
      adMonth++;
      adDay = 1;
    }

    if (adMonth > 12) {
      adYear++;
      adMonth = 1;
    }

    totalBsDays--;
  }
  return [adYear, adMonth, adDay, dayOfWeek];
};

export const calculateAddDays = (year: number, month: number, day: number, dayOfWeek: number, days: number): [number, number, number, number] => {
  validateBS(year, month, day);
  while (days > 0) {
    const daysInMonth = getDaysInBSMonth(year, month);
    if (day + days <= daysInMonth) {
      day += days;
      dayOfWeek = ((dayOfWeek + days - 1) % 7) + 1;
      days = 0;
      break;
    } else {
      const remainingDaysInMonth = daysInMonth - day + 1;
      day = 1;
      month++;
      dayOfWeek = ((dayOfWeek + remainingDaysInMonth - 1) % 7) + 1;
      if (month > 12) {
        year++;
        month = 1;
      }
      days -= remainingDaysInMonth;
    }
  }
  return [year, month, day, dayOfWeek];
};

export const calculateAddMonths = (year: number, month: number, day: number, dayOfWeek: number, months: number): [number, number, number, number] => {
  validateBS(year, month, day);
  let totalDays = 0;
  for (let i = 0; i < months; i++) {
    const daysInMonth = getDaysInBSMonth(year, month);
    totalDays += daysInMonth;
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  dayOfWeek = ((dayOfWeek + totalDays - 1) % 7) + 1;
  const newMonthDays = getDaysInBSMonth(year, month);
  if (day > newMonthDays) day = newMonthDays;
  return [year, month, day, dayOfWeek];
};

export const calculateAddYears = (year: number, month: number, day: number, dayOfWeek: number, years: number): [number, number, number, number] => {
  validateBS(year, month, day);
  let totalDays = 0;
  let yearIndex = year - BASE_YEAR_BS;
  totalDays += sumArray(NEPALI_DATE_MAP[yearIndex]!.slice(month));
  for (let i = 0; i < years; i++) {
    totalDays += sumArray(NEPALI_DATE_MAP[yearIndex + i]!.slice(1));
    year++;
  }
  dayOfWeek = ((dayOfWeek + totalDays - 1) % 7) + 1;
  const newYearDays = getDaysInBSMonth(year, month);
  if (day > newYearDays) day = newYearDays;
 return [year, month, day, dayOfWeek];
};

export const calculateSubDays = (year: number, month: number, day: number, dayOfWeek: number, days: number): [number, number, number, number] => {
  validateBS(year, month, day);
  while (days > 0) {
    if (day > days) {
      day -= days;
      dayOfWeek = ((dayOfWeek - days - 1 + 7) % 7) + 1;
      days = 0;
      break;
    } else {
      days -= day;
      month--;
      if (month < 1) {
        year--;
        month = 12;
      }
      dayOfWeek = ((dayOfWeek - day - 1 + 7) % 7) + 1;
      day = getDaysInBSMonth(year, month);
    }
  }
  return [year, month, day, dayOfWeek];
};

export const calculateSubMonths = (year: number, month: number, day: number, dayOfWeek: number, months: number): [number, number, number, number] => {
  validateBS(year, month, day);
  let totalDays = 0;
  for (let i = 0; i < months; i++) {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    totalDays += getDaysInBSMonth(year, month);
  }
  dayOfWeek = ((dayOfWeek - totalDays - 1 + 7) % 7) + 1;
  const newMonthDays = getDaysInBSMonth(year, month);
  if (day > newMonthDays) day = newMonthDays;
  return [year, month, day, dayOfWeek];
};

export const calculateSubYears = (year: number, month: number, day: number, dayOfWeek: number, years: number): [number, number, number, number] => {
  validateBS(year, month, day);
  let totalDays = 0;
  let yearIndex = year - BASE_YEAR_BS;
  totalDays += sumArray(NEPALI_DATE_MAP[yearIndex]!.slice(1, month - 1));
  for (let i = 0; i < years; i++) {
    totalDays += sumArray(NEPALI_DATE_MAP[yearIndex - i]!.slice(1));
    year--;
  }
  dayOfWeek = ((dayOfWeek - totalDays - 1 + 7) % 7) + 1;
  const newYearDays = getDaysInBSMonth(year, month);
  if (day > newYearDays) day = newYearDays;
 return [year, month, day, dayOfWeek];
};

export const calculateAddSecond = () => { };
