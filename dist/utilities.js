import { NEPALI_DATE_MAP, NORMAL_MONTHS, LEAP_MONTHS, NUM_NP, START_WEEK_DAY_BS, BASE_YEAR_BS, BASE_YEAR_AD } from "./constant";
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
    const yearIndex = year - BASE_YEAR_BS;
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
 * Total days from BASE_YEAR_AD to given AD date
 */
export const getTotalADDays = (year, month, day) => {
    let totalDays = 0;
    for (let y = BASE_YEAR_AD; y < year; y++) {
        totalDays += sumArray(isLeapYear(y) ? LEAP_MONTHS : NORMAL_MONTHS);
    }
    totalDays += sumArray((isLeapYear(year) ? LEAP_MONTHS : NORMAL_MONTHS).slice(0, month - 1));
    return totalDays + day;
};
/**
 * Total days from BASE_YEAR_BS to given BS date
 */
export const getTotalBSDays = (year, month, day) => {
    let totalDays = 0;
    for (let y = BASE_YEAR_BS; y < year; y++) {
        const yearIndex = y - BASE_YEAR_BS;
        totalDays += sumArray(NEPALI_DATE_MAP[yearIndex]?.slice(1) ?? []);
    }
    const yearIndex = year - BASE_YEAR_BS;
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
 * Compare two Nepali dates.
 * Returns:
 *   1 if date1 > date2
 *  -1 if date1 < date2
 *   0 if date1 === date2
 */
export const compareDates = (date1, date2, withTime = false) => {
    const fields = ["year", "month", "day"];
    if (withTime)
        fields.push("hour", "minute");
    for (const field of fields) {
        const a = date1[field] ?? 0;
        const b = date2[field] ?? 0;
        if (a > b)
            return 1; // date1 is after
        if (a < b)
            return -1; // date1 is before
    }
    return 0; // equal
};
//# sourceMappingURL=utilities.js.map