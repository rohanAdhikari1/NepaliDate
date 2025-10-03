import type NepaliDate from "./NepaliDate";
/**
 * Calculate day of week for a BS date.
 */
export declare const calculateDayofWeek: (year: number, month: number, day: number) => number;
/**
 * Get number of days in a BS month
 */
export declare const getDaysInBSMonth: (year: number, month: number) => number;
/**
 * Sum array of numbers
 */
export declare const sumArray: (arr: number[]) => number;
/**
 * Check if a year is a leap year
 */
export declare const isLeapYear: (year: number) => boolean;
/**
 * Get number of days in AD month
 */
export declare const getDaysInADMonth: (year: number, month: number) => number;
/**
 * Total days from BASE_YEAR_AD to given AD date
 */
export declare const getTotalADDays: (year: number, month: number, day: number) => number;
/**
 * Total days from BASE_YEAR_BS to given BS date
 */
export declare const getTotalBSDays: (year: number, month: number, day: number) => number;
/**
 * Convert English number string or number to Nepali Unicode string
 */
export declare const convertToUnicode: (nums: string | number) => string;
/**
 * Convert Nepali Unicode digits to English digits
 */
export declare const convertToDigit: (nums: string | number) => string;
/**
 * Compare two Nepali dates.
 * Returns:
 *   1 if date1 > date2
 *  -1 if date1 < date2
 *   0 if date1 === date2
 */
export declare const compareDates: (date1: NepaliDate, date2: NepaliDate, withTime?: boolean) => number;
//# sourceMappingURL=utilities.d.ts.map