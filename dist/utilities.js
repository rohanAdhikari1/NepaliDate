import { NEPALI_DATE_MAP, START_YEAR_BS, NORMAL_MONTHS, LEAP_MONTHS, NUM_NP, START_YEAR_AD, START_WEEK_DAY_BS } from "./constant";
/**
 * Calculate day of week for a BS date.
 */
export const calculateDayofWeek = (year, month, day) => {
    const totalDays = getTotalBSDays(year, month, day);
    let dayOfWeek = START_WEEK_DAY_BS;
    dayOfWeek = ((dayOfWeek + totalDays - 1) % 7) + 1;
    return dayOfWeek;
};
/**
 * Get number of days in a BS month
 */
export const getDaysInBSMonth = (year, month) => {
    const yearIndex = year - START_YEAR_BS;
    return NEPALI_DATE_MAP[yearIndex]?.[month] ?? 0;
};
/**
 * Sum array of numbers
 */
export const sumArray = (arr) => arr.reduce((a, b) => a + b, 0);
/**
 * Check if a year is a leap year
 */
export const isLeapYear = (year) => year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
/**
 * Get number of days in AD month
 */
export const getDaysInADMonth = (year, month) => (isLeapYear(year) ? LEAP_MONTHS[month - 1] : NORMAL_MONTHS[month - 1]) ?? 0;
/**
 * Total days from START_YEAR_AD to given AD date
 */
export const getTotalADDays = (year, month, day) => {
    let totalDays = 0;
    for (let y = START_YEAR_AD; y < year; y++) {
        totalDays += sumArray(isLeapYear(y) ? LEAP_MONTHS : NORMAL_MONTHS);
    }
    totalDays += sumArray((isLeapYear(year) ? LEAP_MONTHS : NORMAL_MONTHS).slice(0, month - 1));
    return totalDays + day;
};
/**
 * Total days from START_YEAR_BS to given BS date
 */
export const getTotalBSDays = (year, month, day) => {
    let totalDays = 0;
    for (let y = START_YEAR_BS; y < year; y++) {
        const yearIndex = y - START_YEAR_BS;
        totalDays += sumArray(NEPALI_DATE_MAP[yearIndex]?.slice(1) ?? []);
    }
    const yearIndex = year - START_YEAR_BS;
    totalDays += sumArray(NEPALI_DATE_MAP[yearIndex]?.slice(1, month - 1) ?? []);
    return totalDays + day;
};
/**
 * Convert English number string or number to Nepali Unicode string
 */
export const convertToUnicode = (nums) => {
    const numStr = nums.toString();
    let nepaliStr = "";
    for (let char of numStr) {
        if (char >= "0" && char <= "9") {
            nepaliStr += NUM_NP[parseInt(char)] ?? char;
        }
        else {
            nepaliStr += char;
        }
    }
    return nepaliStr;
};
/**
 * Convert Nepali Unicode digits to English digits
 */
export const convertToDigit = (nums) => {
    const numStr = nums.toString();
    let englishStr = "";
    for (let char of numStr) {
        const index = NUM_NP.indexOf(char);
        englishStr += index !== -1 ? index.toString() : char;
    }
    return englishStr;
};
/**
 * Compare two Nepali dates
 * Returns true if startDate is after endDate, false otherwise
 */
export const compareDates = (startDate, endDate, withTime = false) => {
    if (startDate.year !== endDate.year) {
        return startDate.year > endDate.year;
    }
    if (startDate.month !== endDate.month) {
        return startDate.month > endDate.month;
    }
    if (startDate.day !== endDate.day) {
        return startDate.day > endDate.day;
    }
    if (withTime) {
        if (startDate.hour !== endDate.hour) {
            return startDate.hour > endDate.hour;
        }
        if (startDate.minute !== endDate.minute) {
            return startDate.minute > endDate.minute;
        }
    }
    return false;
};
//# sourceMappingURL=utilities.js.map