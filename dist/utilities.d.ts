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
 * Total days from START_YEAR_AD to given AD date
 */
export declare const getTotalADDays: (year: number, month: number, day: number) => number;
/**
 * Total days from START_YEAR_BS to given BS date
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
 * Compare two Nepali dates
 * Returns true if startDate is after endDate, false otherwise
 */
export declare const compareDates: (startDate: NepaliDate, endDate: NepaliDate, withTime?: boolean) => boolean;
//# sourceMappingURL=utilities.d.ts.map